import pandas as pd
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score

# Load the dataset
data = pd.read_csv('diverse_symptoms_dataset.csv')

# Limit the dataset to a smaller subset (e.g., first 20 rows) for demonstration
data = data.head(20)

X = data.drop('disease', axis=1)
y = data['disease']

# Encode the target labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train).astype('float16')  # Use float16 for reduced memory
X_test = scaler.transform(X_test).astype('float16')        # Use float16 for reduced memory

# Convert data to PyTorch tensors with float16
X_train = torch.tensor(X_train, dtype=torch.float16)
X_test = torch.tensor(X_test, dtype=torch.float16)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)

# Define the neural network model
class SymptomDiseaseModel(nn.Module):
    def __init__(self, input_size, num_classes):
        super(SymptomDiseaseModel, self).__init__()
        self.layer1 = nn.Linear(input_size, 8)
        self.layer2 = nn.Linear(8, 4)
        self.layer3 = nn.Linear(4, num_classes)

    def forward(self, x):
        x = torch.relu(self.layer1(x))
        x = torch.relu(self.layer2(x))
        x = self.layer3(x)
        return x

input_size = X_train.shape[1]
num_classes = len(label_encoder.classes_)
model = SymptomDiseaseModel(input_size, num_classes)

# Define the loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training the model
num_epochs = 100

for epoch in range(num_epochs):
    model.train()
    optimizer.zero_grad()  # Move zero_grad() to the beginning for better memory efficiency

    outputs = model(X_train)
    loss = criterion(outputs, y_train)

    loss.backward()
    optimizer.step()

    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch + 1}/{num_epochs}], Loss: {loss.item():.4f}')

# Evaluate the model on the test set
model.eval()
with torch.no_grad():
    outputs = model(X_test)
    _, predicted = torch.max(outputs.data, 1)
    accuracy = accuracy_score(y_test, predicted)
    print(f'Test Accuracy: {accuracy * 100:.2f}%')

# Example of making a prediction
def predict(symptoms):
    model.eval()
    with torch.no_grad():
        symptoms = torch.tensor(symptoms, dtype=torch.float16).unsqueeze(0)  # Use float16
        symptoms = scaler.transform(symptoms).astype('float16')  # Standardize and convert to float16
        output = model(torch.tensor(symptoms, dtype=torch.float16))
        _, predicted = torch.max(output.data, 1)
        disease = label_encoder.inverse_transform(predicted.numpy())[0]
        return disease

# Example usage
symptoms = [1, 1, 1, 1, 1, 0, 1, 0]  # Example input
predicted_disease = predict(symptoms)
print(f'Predicted Disease: {predicted_disease}')

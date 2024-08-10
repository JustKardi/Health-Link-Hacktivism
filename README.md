
MongoDB Setup

Steps
1. Install MongoDB
    - Go to MongoDB Atlas and sign up or log in.
    - Create a new cluster.
    - Whitelist your IP address.
    - Create a new database user with a username and password (Make sure to save the password in a notepad or something similar).
    - Get the connection string (URI) for your cluster.

2. Create the Database
    - Once MongoDB is installed and running, create a database called logincollections

3. Project Setup
    - Clone repository
        gh repo clone JustKardi/Health-Link-Hacktivism
        cd backend

    - Install dependencies
        npm install

    - Create a .env file in the src directory:

    - Add the following variables to the .env file:
        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/logincollections?retryWrites=true&w=majority DB_NAME=logincollections PORT=5508

        Make sure to change the whole <username>, <password>, and PORT number with your own credentials

4. Run the Application
    cd backend/src
    nodemon index.js


    


// script.js

// Mock hospital data
const hospitals = [
    {
        name: "General Hospital",
        location: "123 Main St, Springfield, IL",
        waitTime: 30, // in minutes
        driveTime: 10, // in minutes
    },
    {
        name: "City Medical Center",
        location: "456 Elm St, Springfield, IL",
        waitTime: 45,
        driveTime: 15,
    },
    {
        name: "Town Health Clinic",
        location: "789 Maple St, Springfield, IL",
        waitTime: 20,
        driveTime: 5,
    },
    {
        name: "Regional Hospital",
        location: "101 Oak St, Springfield, IL",
        waitTime: 60,
        driveTime: 25,
    },
];

// Function to calculate estimated wait time on arrival
function calculateEstimatedWaitTime(waitTime, driveTime) {
    return waitTime + driveTime;
}

// Function to render hospital cards
function renderHospitalCards() {
    const hospitalCardsContainer = document.getElementById('hospital-cards');
    hospitalCardsContainer.innerHTML = '';

    hospitals.forEach(hospital => {
        const estimatedWaitTime = calculateEstimatedWaitTime(hospital.waitTime, hospital.driveTime);
        const card = document.createElement('div');
        card.className = 'card';

        // Add click event to navigate to the maps page
        card.addEventListener('click', () => {
            window.location.href = `maps.html?name=${encodeURIComponent(hospital.name)}&location=${encodeURIComponent(hospital.location)}`;
        });

        card.innerHTML = `
            <h2>${hospital.name}</h2>
            <p><strong>Location:</strong> ${hospital.location}</p>
            <p class="wait-time">Current Wait Time: ${hospital.waitTime} min</p>
            <p class="drive-time">Drive Time: ${hospital.driveTime} min</p>
            <p><strong>Estimated Wait Time on Arrival:</strong> ${estimatedWaitTime} min</p>
        `;
        
        hospitalCardsContainer.appendChild(card);
    });
}

// Initial render
renderHospitalCards();

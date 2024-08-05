// cards.js
const sampleData = [
    {
        pageTitle: "Viruses",
        iconClass: "fa-solid fa-virus icon-virus",
        link: "/viruses"
    },
    {
        pageTitle: "Virus Research Assistant",
        iconClass: "fa-solid fa-microscope icon-microscope",
        link: "/isolation"
    },
    {
        pageTitle: "AI Virus Diagnostic Assistant",
        iconClass: "fa-solid fa-robot icon-robot",
        link: "/ai"
    },
    {
        pageTitle: "Maps",
        iconClass: "fa-solid fa-map icon-map",
        link: "/maps"
    }
];

document.addEventListener("DOMContentLoaded", function() {
    const cardList = document.getElementById("card-list");

    if (!cardList) {
        console.error("Element not found");
        return;
    }

    sampleData.forEach(data => {
        const card = createCardElement(data);
        cardList.appendChild(card);
    });
});

function createCardElement(data) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <a href="${data.link}">
            <i class="${data.iconClass}" style="font-size: 40px; margin-bottom: 20px;"></i>
            <div class="title">
                <p>${data.pageTitle}</p>
            </div>
        </a>
    `;
    return card;
}

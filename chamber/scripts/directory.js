// ===============================
// Select Elements
// ===============================

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// ===============================
// Fetch Member Data
// ===============================

const membersURL = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Unable to fetch member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error(error);
    }
}

// ===============================
// Display Members
// ===============================

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">

            <h2>${member.name}</h2>

            <p><strong>Industry:</strong> ${member.industry}</p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p>
                <strong>Membership:</strong>
                ${getMembershipLevel(member.membership)}
            </p>
        `;

        membersContainer.appendChild(card);

    });

}

// ===============================
// Membership Level
// ===============================

function getMembershipLevel(level) {

    switch (level) {

        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        default:
            return "Member";

    }

}

// ===============================
// Grid View
// ===============================

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");

    membersContainer.classList.remove("list-view");

});

// ===============================
// List View
// ===============================

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    membersContainer.classList.remove("grid-view");

});

// ===============================
// Initial Load
// ===============================

getMembers();
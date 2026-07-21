// ===========================================
// WEATHER
// ===========================================

const apiKey = "861aba3016013b408298d226c50cbc2d";
const city = "Ibadan";
const country = "NG";

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const forecast = document.querySelector("#forecast");

async function getWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Unable to load weather data.");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        console.error(error);

        temperature.textContent = "Weather unavailable";
        description.textContent = "";
        forecast.innerHTML = "";
    }
}

function displayWeather(data) {

    const current = data.list[0];

    temperature.textContent = `Current Temperature: ${Math.round(current.main.temp)}°C`;

    description.textContent = `Condition: ${current.weather[0].description}`;

    forecast.innerHTML = "<h3>3-Day Forecast</h3>";

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);

        const forecastCard = document.createElement("p");

        forecastCard.innerHTML = `
            <strong>${date.toLocaleDateString("en-US", {
            weekday: "long"
        })}</strong>: ${Math.round(day.main.temp)}°C
        `;

        forecast.appendChild(forecastCard);

    });
}

// ===========================================
// MEMBER SPOTLIGHTS
// ===========================================

const spotlightContainer = document.querySelector("#spotlight-container");

const membersURL = "data/members.json";

async function getSpotlights() {

    try {

        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";

    }
}

function displaySpotlights(members) {

    const qualifiedMembers = members.filter(member =>
        member.membership === 2 || member.membership === 3
    );

    shuffleArray(qualifiedMembers);

    const selectedMembers = qualifiedMembers.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name} Logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p><strong>Industry:</strong> ${member.industry}</p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>${member.email}</p>

            <p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener">
                   ${member.website.replace("https://", "").replace("http://", "")}
                </a>
            </p>

            <p><strong>${member.membership === 3
                ? "🥇 Gold Member"
                : "🥈 Silver Member"
            }</strong></p>
        `;

        spotlightContainer.appendChild(card);

    });
}

// ===========================================
// SHUFFLE ARRAY
// ===========================================

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

// ===========================================
// INITIALIZE PAGE
// ===========================================

getWeather();
getSpotlights();
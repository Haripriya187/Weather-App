const apiKey = "770666dbf24377657c25968dff3e8846"; 

let currentTempCelsius = null;
let isCelsius = true;

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorMsg = document.getElementById("errorMsg");
    const weatherCard = document.getElementById("weatherCard");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name!";
        weatherCard.classList.add("hidden");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        errorMsg.textContent = "";

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        currentTempCelsius = temp;

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `${temp}°C`;
        document.getElementById("description").textContent = desc;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("wind").textContent = wind;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherCard.classList.remove("hidden");

        updateBackground(desc);

    } catch (error) {
        errorMsg.textContent = "Invalid city name or network error!";
        weatherCard.classList.add("hidden");
    }
}

function toggleTemp() {
    const tempElement = document.getElementById("temperature");
    const btn = document.getElementById("toggleBtn");

    if (isCelsius) {
        let f = (currentTempCelsius * 9/5) + 32;
        tempElement.textContent = `${f.toFixed(2)}°F`;
        btn.textContent = "Switch to °C";
        isCelsius = false;
    } else {
        tempElement.textContent = `${currentTempCelsius}°C`;
        btn.textContent = "Switch to °F";
        isCelsius = true;
    }
}

function updateBackground(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(to bottom, #3a3d40, #181719)";
    } else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    } else if (condition.includes("sun") || condition.includes("clear")) {
        document.body.style.background = "linear-gradient(to bottom, #fbc531, #e1b12c)";
    } else {
        document.body.style.background = "linear-gradient(to bottom, #6ec6ff, #4a90e2)";
    }
}


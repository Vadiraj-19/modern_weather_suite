const apikey = "a3461ddedfeb9f8486647706319ec134";

const button = document.getElementById("searchBtn");
const dropdown = document.getElementById("dropdown");
const input = document.getElementById("inputCity");

// Function to get user's current position
function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                (error) => {
                    const messages = {
                        [error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
                        [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
                        [error.TIMEOUT]: "The request to get user location timed out.",
                    };
                    reject(messages[error.code] || "An unknown error occurred.");
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

// Function to update the dropdown
function updateDropdown(cities) {
    dropdown.innerHTML = ''; // Clear existing dropdown
    cities.forEach(city => {
        const div = document.createElement('div');
        div.textContent = city;
        div.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-200', 'text-gray-900');
        div.onclick = () => {
            input.value = city;
            dropdown.style.display = 'none'; // Hide dropdown
        };
        dropdown.appendChild(div);
    });
    dropdown.style.display = cities.length ? 'block' : 'none'; // Show dropdown if cities exist
}

// Save city to localStorage
function saveCityToLocalStorage(cityname) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(cityname)) {
        cities.unshift(cityname);
        if (cities.length > 5) cities.pop(); // Limit to 5 cities
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

// Fetch weather data from an API URL
async function fetchWeatherData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Unable to fetch weather data.");
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please check your connection or try again later.");
        throw error; // Re-throw error to prevent further processing
    }
}

// Update current weather in the UI
function updateCurrentWeather(cur) {
    const curTemp = document.getElementById("tempretureValue");
    curTemp.innerHTML = Math.round(cur.main.temp - 273.15) + '°c';

    const curHum = document.getElementById("percentagevalue");
    curHum.innerHTML = cur.main.humidity + '%';

    const curWind = document.getElementById("windValue");
    curWind.innerHTML = cur.wind.speed + 'Km/h';

    const weatherIcon = document.getElementById("weatherIcon");
    if (cur.weather[0].main === 'Clear') {
        weatherIcon.src = "../image/clear.png";
    }
    else if (['Cloudy', 'Clouds', 'Mist', 'Fog', 'Smoke', 'Dust', 'Sandstorm'].includes(cur.weather[0].main)) {
        weatherIcon.src = "../image/cloud.png";
    }
    else if (['PartlyCloudy', 'Haze', 'Windly'].includes(cur.weather[0].main)) {
        weatherIcon.src = "../image/partly_cloudy.png";
    }
    else if (['Snow', 'Blizzard'].includes(cur.weather[0].main)) {
        weatherIcon.src = "../image/snow.png";
    }
    else if (['Drizzle', 'Rain', 'Heavy Rain', 'ThunderStorm', 'Sleet', 'Freezing Rain'].includes(cur.weather[0].main)) {
        weatherIcon.src = "../image/thunder.png";
    }
    

    const heroName = document.getElementById("weatherTitle");
    heroName.innerHTML = cur.weather[0].description.toUpperCase();

    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = today.getDay();
    const time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const day = document.getElementById("curDay");
    day.innerHTML = `${cur.sys.country}, ${days[dayIndex]}, ${time}`;

    const cityName = document.getElementById("cityName");
    cityName.innerHTML = cur.name;
}

// Update the 5-day forecast in the UI
function updateFiveDayForecast(forecastData) {
    const fiveDayFilter = forecastData.list.filter(data => {
        const time = data.dt_txt.split(' ')[1];
        return time === "12:00:00"; // Get data for midday
    });

    fiveDayFilter.forEach((item, index) => {
        const dateParts = item.dt_txt.split(' ')[0].split('-');
        const temperature = Math.round(item.main.temp - 273.15) + '°c';
        const humidity = item.main.humidity + '%';
        const windSpeed = item.wind.speed + 'Km/h';

        const dayElement = document.getElementById(`dateofday${index + 1}`);
        const tempElement = document.getElementById(`tempofday${index + 1}`);
        const humElement = document.getElementById(`humofday${index + 1}`);
        const windElement = document.getElementById(`windofday${index + 1}`);
        
        if (dayElement && tempElement && humElement && windElement) {
            dayElement.innerHTML = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
            tempElement.innerHTML = `T: ${temperature}`;
            humElement.innerHTML = `H: ${humidity}`;
            windElement.innerHTML = `W: ${windSpeed}`;
        }
    });
}

// Fetch weather for current location and update the UI
async function fetchCurrentLocationWeather() {
    try {
        const coords = await getPosition();
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        console.log(latitude,longitude)

        // Current weather API
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        const currentWeather = await fetchWeatherData(currentWeatherUrl);
        updateCurrentWeather(currentWeather);

        // 5-day forecast API
        const fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        const fiveDayForecast = await fetchWeatherData(fiveDayForecastUrl);
        updateFiveDayForecast(fiveDayForecast);
    } catch (error) {
        console.error("Error fetching current location weather:", error);
    }
}

// Event listener for the search button
button.addEventListener('click', () => {
    const cityname = input.value.trim();
    if (cityname) {
        saveCityToLocalStorage(cityname);
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${cityname}`;
        const fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apikey}&q=${cityname}`;
        
        Promise.all([
            fetchWeatherData(currentWeatherUrl),
            fetchWeatherData(fiveDayForecastUrl)
        ])
        .then(([currentWeather, fiveDayForecast]) => {
            updateCurrentWeather(currentWeather);
            updateFiveDayForecast(fiveDayForecast);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Unable to fetch weather data. Please try again.");
        });
        dropdown.style.display = 'none';
    } else {
        alert("Please enter a city name.");
    }
});

// Event listener for input changes (dropdown filtering)
input.addEventListener('input', () => {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const filteredCities = cities.filter(city => city.toLowerCase().startsWith(input.value.toLowerCase()));
    updateDropdown(filteredCities);
});

// Fetch current location weather on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentLocationWeather();
});

const apikey = "a3461ddedfeb9f8486647706319ec134";


const button = document.getElementById("searchBtn")
const dropdown = document.getElementById("dropdown");
const input = document.getElementById("inputCity")
  
function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude }); // Resolve with the coordinates
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            reject("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            reject("The request to get user location timed out.");
                            break;
                        default:
                            reject("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

// Usage of the function


function updateDropdown(cities) {
    dropdown.innerHTML = ''; // Clear existing dropdown
    cities.forEach(city => {
        const div = document.createElement('div');
        div.textContent = city;
        div.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-200', 'text-gray-900');
        div.onclick = () => {
            input.value = city;
            dropdown.style.display = 'none'; // Hide dropdown when a city is selected
        };
        dropdown.appendChild(div);
    });
    dropdown.style.display = cities.length ? 'block' : 'none'; // Show dropdown if cities exist
}

// Function to save cities to localStorage
function saveCityToLocalStorage(cityname) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    // Add city to the beginning of the array

    if (!cities.includes(cityname)) {
        cities.unshift(cityname);
        // Ensure we only store the last 5 cities
        if (cities.length > 5) {
            cities = cities.slice(0, 5);
        }
        localStorage.setItem('cities', JSON.stringify(cities));

    }



}



input.addEventListener('input', () => {


    // Update dropdown as the user types
    
    // console.log(filteredCities);
    
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    // console.log(cities)
    // const filteredCities = cities.filter(city => city.toLowerCase());
    updateDropdown(cities);
    
    getPosition()
    .then((coords) => {
       const lat = coords.latitude;
       const lon= coords.longitude;
       const posti=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
       const promise3 = fetch(posti)
       .then(response => response.json())
       .then(p=>)
    })

});

button.addEventListener('click', () => {
    const cityname = input.value;
    saveCityToLocalStorage(cityname);
    dropdown.style.display = 'none'
    



    const curweather = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${cityname}`
    const fiveDayData = `https://api.openweathermap.org/data/2.5/forecast?appid=${apikey}&q=${cityname}`

    // local1.innerHTML = local;
    
    const promise1 = fetch(curweather)
        .then(response => response.json())
    const promise2 = fetch(fiveDayData)
        .then(response => response.json())

    Promise.all([promise1, promise2])
        .then(value => {
            const cur = value[0];
            const five = value[1];


            const curTemp = document.getElementById("tempretureValue");
            curTemp.innerHTML = Math.round(cur.main["temp"] - 273.15) + '°c';
            const curHum = document.getElementById("percentagevalue");
            curHum.innerHTML = cur.main["humidity"] + '%';
            const curWind = document.getElementById("windValue");
            curWind.innerHTML = cur.wind["speed"] + 'Km/h';

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

            const heroName = document.getElementById("weatherTitle")
            heroName.innerHTML = cur.weather[0].description.toUpperCase()

            const today = new Date();

            const dayIndex = today.getDay();

            const hours = today.getHours() % 12 || 12;
            const min = today.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? "PM" : "AM"
            const time = `${hours}:${min}${period}`

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const currentDay = days[dayIndex];
            const day = document.getElementById("curDay");
            const country = cur.sys.country;
            day.innerHTML = `${country},${currentDay},${time}`

            const cityname = document.getElementById("cityName")
            cityname.innerHTML = cur.name
            //----------------------------


            const fiveDay = five.list;
            const fiveDayFilter = fiveDay.filter(data => {
                const ttime = data.dt_txt.split(' ');
                return ttime[1] === "12:00:00";
            });

            fiveDayFilter.forEach((item, index) => {
                const dayofDate = item.dt_txt.split(' ')[0].split("-");
                const tempretureoFfive = Math.round(item.main["temp"] - 273.15) + '°c';
                const humidityoFfive = item.main["humidity"] + '%';
                const windoFfive = item.wind["speed"] + 'Km/h';


                const dayElement = document.getElementById(`dateofday${index + 1}`);
                const tempElement = document.getElementById(`tempofday${index + 1}`);
                const humElement = document.getElementById(`humofday${index + 1}`);
                const windElement = document.getElementById(`windofday${index + 1}`);
                if (dayElement, tempElement, humElement, windElement) {
                    dayElement.innerHTML = `${dayofDate[2]}.${dayofDate[1]}.${dayofDate[0]}`;
                    tempElement.innerHTML = `t:${tempretureoFfive}`;
                    humElement.innerHTML = ` H:${humidityoFfive}`;
                    windElement.innerHTML = `W:${windoFfive}`;
                }


            })
            console.log(fiveDayFilter);
        }).catch(error => {
            console.error("Error:", error);
            alert("Unable to fetch weather data. Please try again.");
        });
})


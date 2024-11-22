const apikey = "a3461ddedfeb9f8486647706319ec134";


const button = document.getElementById("searchBtn")
const input = document.getElementById("inputCity")

button.addEventListener('click', () => {
    const cityname = input.value;
    const curweather = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${cityname}`
    const fiveDayData = `https://api.openweathermap.org/data/2.5/forecast?appid=${apikey}&q=${cityname}`

    
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
                if (dayElement,tempElement,humElement,windElement) {
                    dayElement.innerHTML = `${dayofDate[2]}.${dayofDate[1]}.${dayofDate[0]}`;
                    tempElement.innerHTML = `temp:${tempretureoFfive}`;
                    humElement.innerHTML = `Hum:${humidityoFfive}`;
                    windElement.innerHTML = `Wind:${windoFfive}`;
                }
                

            })
            console.log(fiveDayFilter);
        }).catch(error => {
            console.error("Error:", error);
            alert("Unable to fetch weather data. Please try again.");
          });
})


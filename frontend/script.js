document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const forecastForm = document.getElementById('forecast-form');
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');
    const host = 'http://127.0.0.1:5000'
    
    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.getElementById('location').value;
        
        fetch(`${host}/get_weather?location=${location}`)
            .then(response => response.json())
            .then(data => {
            const weatherInfo = `
                <div class="card">
                    <div class="card-header">
                        <h3>${data.name}, ${data.sys.country}</h3>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Temperature: ${data.main.temp}°C</p>
                        <p class="card-text">Feels Like: ${data.main.feels_like}°C</p>
                        <p class="card-text">Humidity: ${data.main.humidity}%</p>
                        <p class="card-text">Visibility: ${data.visibility} meters</p>
                        <p class="card-text">Wind Speed: ${data.wind.speed} m/s</p>
                        <p class="card-text">Wind Direction: ${data.wind.deg}°</p>
                        <p class="card-text">Cloudiness: ${data.clouds.all}%</p>
                        <p class="card-text">Weather: ${data.weather[0].description}</p>
                    </div>
                </div>
            `;
                currentWeatherDiv.innerHTML = weatherInfo;
            })
            .catch(error => console.log(error));
    });
    
    forecastForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const forecastLocation = document.getElementById('forecast-location').value;
        
        fetch(`${host}/get_weather_forecast?location=${forecastLocation}`)
                    .then(response => response.json())
                    .then(data => {
                        const groupedForecast = groupForecastByDate(data);
                        displayForecast(groupedForecast);
                forecastDiv.innerHTML = forecastInfo;
            })
            .catch(error => console.log(error));
    });



function groupForecastByDate(forecastData) {
    const grouped = {};
    forecastData.forEach(entry => {
        const date = entry.dt_txt.split(' ')[0];
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(entry);
    });
    return grouped;
}

function displayForecast(groupedForecast) {
    let forecastInfo = '';
    for (const date in groupedForecast) {
        forecastInfo += `
            <div class="card mb-3">
                <div class="card-header">
                    <h5>${date}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
        `;
        groupedForecast[date].forEach(entry => {
            forecastInfo += `
                <div class="col-md-3 border p-3 m-0">
                    <p>${entry.dt_txt.split(' ')[1]}</p>
                    <p>${entry.temp}°C</p>
                    <p>${entry.weather_description}</p>
                    <p>Wind: ${entry.wind_speed} m/s</p>
                </div>
            `;
        });
        forecastInfo += `
                    </div>
                </div>
            </div>
        `;
    }
    forecastDiv.innerHTML = forecastInfo;
}

});
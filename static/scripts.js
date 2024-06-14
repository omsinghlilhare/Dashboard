const fetchCurrentWeather = async () => {
    try {
        const response = await fetch('/weather/current');
        const data = await response.json();
        document.getElementById('weather-data').innerText = `Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C, Condition: ${data.weather[0].description}`;
    } catch (error) {
        document.getElementById('weather-data').innerText = 'Error fetching current weather data';
    }
};

const fetchAirQuality = async () => {
    try {
        const response = await fetch('/air_quality');
        const data = await response.json();
        const aqi = data.list[0].main.aqi;
        let aqiDescription = '';
        switch (aqi) {
            case 1:
                aqiDescription = 'Good';
                break;
            case 2:
                aqiDescription = 'Fair';
                break;
            case 3:
                aqiDescription = 'Moderate';
                break;
            case 4:
                aqiDescription = 'Poor';
                break;
            case 5:
                aqiDescription = 'Very Poor';
                break;
            default:
                aqiDescription = 'Unknown';
        }
        document.getElementById('air-quality-data').innerText = `Air Quality Index (AQI): ${aqi} (${aqiDescription})`;
    } catch (error) {
        document.getElementById('air-quality-data').innerText = 'Error fetching air quality data';
    }
};

const fetchWeatherForecast = async () => {
    try {
        const response = await fetch('/weather/forecast');
        const data = await response.json();
        const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
        const temperatures = data.list.map(item => (item.main.temp - 273.15).toFixed(2));

        const ctx = document.getElementById('forecast-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        document.getElementById('forecast-chart').innerText = 'Error fetching weather forecast data';
    }
};

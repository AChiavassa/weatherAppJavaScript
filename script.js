let urlApi = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = 'e1c32688dbb0443037bbe81f3499dbd6'
let difKelvin = 273.15

document.getElementById('searchButton').addEventListener('click', () => {
    const cityName = document.getElementById('cityEntry').value
    if (cityName) {
        getWeatherData(cityName)
        
    }
})

function getWeatherData(cityName) {
    fetch(`${urlApi}?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => showWeatherData(response))
}

function showWeatherData(response) {
    
    const errorText = document.getElementById('errorText');
    if (response.cod === '404') {
        errorText.textContent = 'City not found. Please enter a valid city name.';
        return; 
    }
    errorText.textContent = '';

    const weatherData = document.getElementById('weatherData')
    weatherData.innerHTML = ''
    
    const name = response.name
    const country = response.sys.country
    const temp = response.main.temp
    const humidity = response.main.humidity
    const icon = response.weather[0].icon
    const description = response.weather[0].description

    const dt = response.dt
    const sunrise = response.sys.sunrise * 1000;
    const sunset = response.sys.sunset * 1000;
    const currentTime = new Date(dt * 1000);

    let dayOrNight = '';

    if (currentTime > sunrise && currentTime < sunset) {
            dayOrNight = 'day'
    } else {
            dayOrNight = 'night'
    }
    

    const cityTitle = document.createElement('h2')
    cityTitle.textContent = `${name}, ${country}`

    const tempInfo = document.createElement('h4')
    tempInfo.textContent = `The current temperature is ${Math.floor(temp-difKelvin)}°C`
    
    const humidityInfo = document.createElement('h4')
    humidityInfo.textContent = `The current humidity is ${humidity}%`

    const iconMark = document.createElement('img')
    iconMark.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `A beautiful ${dayOrNight} with ${description}!`

    weatherData.appendChild(cityTitle)
    weatherData.appendChild(tempInfo)
    weatherData.appendChild(humidityInfo)
    weatherData.appendChild(iconMark)
    weatherData.appendChild(descriptionInfo)
}

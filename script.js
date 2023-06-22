const apiKey = 'cbf695abb50ee416c866639a15088437';

document.getElementById('get-weather-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value;
  try {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    displayWeather(weatherData, forecastData);
  } catch (error) {
    console.log('Error:', error);
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unable to fetch weather data.');
  }

  const data = await response.json();
  return data;
}

async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unable to fetch forecast data.');
  }

  const data = await response.json();
  return data;
}

function displayWeather(weatherData, forecastData) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = '';

  // Display current weather
  const currentWeatherCard = createCurrentWeatherCard(weatherData);
  weatherInfo.appendChild(currentWeatherCard);

  // Display forecast
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecast = forecastData.list[i];
    const forecastCard = createForecastCard(forecast);
    weatherInfo.appendChild(forecastCard);
  }
}

function createCurrentWeatherCard(data) {
  const card = document.createElement('div');
  card.className = 'card';

  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;

  const temperatureElement = document.createElement('h3');
  temperatureElement.textContent = `${temperature}°C`;
  card.appendChild(temperatureElement);

  const iconElement = document.createElement('img');
  iconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  iconElement.alt = weatherDescription;
  card.appendChild(iconElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = weatherDescription;
  card.appendChild(descriptionElement);

  return card;
}

function createForecastCard(data) {
  const card = document.createElement('div');
  card.className = 'card';

  const date = new Date(data.dt * 1000);
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;

  const dateElement = document.createElement('h3');
  dateElement.textContent = date.toDateString();
  card.appendChild(dateElement);

  const iconElement = document.createElement('img');
  iconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  iconElement.alt = weatherDescription;
  card.appendChild(iconElement);

  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `${temperature}°C`;
  card.appendChild(temperatureElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = weatherDescription;
  card.appendChild(descriptionElement);

  return card;
}

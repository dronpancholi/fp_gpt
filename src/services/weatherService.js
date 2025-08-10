import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherService {
  async getWeather(city) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      return this.formatWeatherResponse(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Could not fetch weather data. Please check the city name.');
    }
  }

  formatWeatherResponse(data) {
    const { name, main, weather, wind } = data;
    return {
      content: `The current weather in ${name} is ${weather[0].description} with a temperature of ${main.temp}°C. The wind speed is ${wind.speed} m/s.`,
      sources: ['OpenWeatherMap'],
      accuracy: 95,
      confidence: 90,
      primarySource: 'OpenWeatherMap',
      timestamp: new Date(),
    };
  }
}

export default new WeatherService();

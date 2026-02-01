# 🌤️ J.SkyCast - Modern Weather Application

A beautiful, responsive weather application with real-time weather data, air quality monitoring, and dynamic background themes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![WeatherAPI](https://img.shields.io/badge/API-WeatherAPI-green.svg)

## ✨ Features

- 🌍 **Global Weather Data** - Get weather for any city worldwide
- 📍 **Geolocation Support** - Automatic location detection
- 🌈 **Dynamic Backgrounds** - Background changes based on weather conditions
- 💨 **Air Quality Index** - Real-time AQI monitoring with EPA standards
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Works on all devices
- 🌙 **Day/Night Themes** - Automatic theme switching based on local time

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/j.weather.git
   cd j.weather
   ```

2. **Set up your API key**
   
   a. Copy the example configuration file:
   ```bash
   cp config.example.js config.js
   ```
   
   b. Open `config.js` and replace `YOUR_API_KEY_HERE` with your actual WeatherAPI key:
   ```javascript
   const CONFIG = {
       WEATHER_API_KEY: 'your_actual_api_key_here',
       DEFAULT_CITY: 'Kolkata'  // Change to your preferred default city
   };
   ```

3. **Open the application**
   
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```
   
   Then navigate to `http://localhost:8000`

## 🔐 Security

**IMPORTANT:** This project uses client-side API calls for simplicity. For production use, consider:

- ✅ **config.js is git-ignored** - Your API key won't be committed
- ⚠️ API keys are visible in browser dev tools - Consider implementing a backend proxy
- 🔒 Basic dev tools protection is enabled (easily bypassable)

### For Production

For a production environment, create a backend server to proxy API requests:

```javascript
// Example Node.js/Express backend
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY; // Store in environment variable
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
    const data = await response.json();
    res.json(data);
});
```

## 📁 Project Structure

```
j.weather/
├── index.html              # Main HTML file
├── weather.js              # Secure JavaScript (uses config.js)
├── weather.modified.css    # Main stylesheet
├── hidden.style.css        # Additional styles
├── config.js               # Your API key (git-ignored)
├── config.example.js       # Template for configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🎯 Features Breakdown

### Weather Data
- Current temperature and "feels like" temperature
- Weather conditions with animated icons
- Wind speed and direction
- Humidity levels
- UV Index
- Visibility
- Atmospheric pressure
- Precipitation

### Air Quality
- EPA Air Quality Index (1-6 scale)
- CO, NO₂, and O₃ levels
- Visual indicators and color coding
- Health recommendations

### Dynamic Themes
The app automatically adjusts its appearance based on:
- Time of day (day/night)
- Weather conditions (sunny, rainy, cloudy, etc.)
- Animated background particles and weather effects

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with Glassmorphism effects
- **JavaScript (ES6+)** - Application logic
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icons
- **WeatherAPI** - Weather data provider

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Design inspiration from modern weather apps

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**⚠️ Remember:** Never commit your `config.js` file with your actual API key to a public repository!

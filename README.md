# 🌤️ J.SkyCast – Premium Weather Dashboard

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 🚀 **[Live Demo](https://j-weather.onrender.com/)**

*A premium glassmorphism weather dashboard with real-time forecasts, air quality monitoring, and dynamic sky visuals.*

</div>

---

## 📸 Preview

Visit the live application: **[https://j-weather.onrender.com/](https://j-weather.onrender.com/)**

## 💡 Project Highlights

This project showcases **professional-grade front-end development** with emphasis on:

✅ **Glassmorphism UI** – Frosted-glass cards, translucent panels, and ambient glows  
✅ **Zero Dependencies** – Pure HTML, CSS & vanilla JavaScript — no frameworks, no build tools  
✅ **Dynamic Theming** – Background imagery and gradients adapt to live weather conditions  
✅ **Security** – API key management via git-ignored config with Base64 fallback  
✅ **Production Deployment** – Live on Render with CI/CD integration  
✅ **Clean Architecture** – Modular, well-documented, separation of concerns  

## ✨ Key Features

### 🌍 Core Functionality
- **Real-time Weather Data** – Current conditions for any city worldwide via WeatherAPI
- **3-Day Forecast Strip** – Interactive forecast with SVG temperature graph
- **Geolocation** – One-click "Use my location" for instant local weather
- **Air Quality Index** – EPA-standard AQI with CO, NO₂, O₃ pollutant breakdown
- **Comprehensive Metrics** – Temperature, humidity, wind speed & direction, UV index, visibility, pressure, dew point, cloud cover
- **Sunrise / Sunset** – Animated sun arc with real-time position dot and daylight progress bar

### 🎨 Design & UI/UX
- **Glassmorphism Design System** – `backdrop-filter: blur()`, translucent `rgba` backgrounds, and soft glow borders throughout
- **CSS Grid Dashboard** – Three-column layout: left nav sidebar (60 px) · hero panel · right data sidebar (320 px)
- **Dynamic Hero Backgrounds** – Unsplash sky photographs swap based on weather condition (fog, rain, clear, snow, etc.)
- **SVG Inline Icons** – No icon library — all icons are hand-crafted inline SVGs for zero external requests
- **Plus Jakarta Sans Typography** – Modern variable-weight Google Font (300–800)
- **Micro-animations** – `slideUpFade` entrance animations, hover transforms, smooth transitions on every interactive element
- **Glassmorphism Footer** – In-panel footer with `blur(20px)`, teal accent border glow, social links with labels, and copyright — scoped to the main panel only, never overlapping the right sidebar

### ⚡ Technical Excellence
- **Async / Await** – Modern JavaScript asynchronous API calls with robust error handling
- **Fetch API** – Native HTTP requests, zero external HTTP libraries
- **DOM Manipulation** – Efficient targeted element updates and state management
- **SVG Graph Rendering** – Programmatic SVG polyline temperature graph with gradient fill
- **Browser APIs** – Geolocation API for device location, CSS custom properties for theming
- **Responsive Breakpoints** – Tablet (≤ 900 px) and mobile (≤ 640 px) adaptations via pure CSS media queries

## 🛠️ Tech Stack

```
├── HTML5          Semantic markup, accessibility attributes
├── CSS3           Grid, Flexbox, Custom Properties, Glassmorphism, Animations
├── JavaScript     ES6+ — async/await, destructuring, template literals
├── Google Fonts   Plus Jakarta Sans (variable weight)
└── WeatherAPI     Real-time weather, forecast, air quality data
```

> **No build step • No frameworks • No bundlers.** Open `index.html` and go.

## 📁 Project Structure

```
j.weather/
├── index.html              # Dashboard layout — grid, sidebar, hero, footer
├── weather.js              # All application logic & API integration
├── weather.modified.css    # Full design system — glassmorphism, grid, animations
├── config.js               # Local API key (git-ignored)
├── config.example.js       # Configuration template for contributors
├── SECURITY_AUDIT.md       # Security documentation & best practices
├── .gitignore              # Version control exclusions
└── README.md               # This file
```

## 🚀 Quick Start

### Live Demo
No installation required! Visit: **[https://j-weather.onrender.com/](https://j-weather.onrender.com/)**

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/JyotirmoyLaha/j.weather.git
   cd j.weather
   ```

2. **Set up API credentials** *(optional — a fallback key is embedded)*
   ```bash
   cp config.example.js config.js
   # Edit config.js with your WeatherAPI key from https://www.weatherapi.com/
   ```

3. **Start a local server**
   ```bash
   python -m http.server 8787
   # or
   npx http-server -p 8787
   ```

4. **Open in browser**
   ```
   http://localhost:8787
   ```

## 🔐 Security

- ✅ API keys stored in `config.js` (git-ignored)
- ✅ Base64-encoded fallback for production deployment
- ✅ Graceful fallback when `config.js` is missing
- ✅ Comprehensive error handling for invalid credentials

> **⚠️ Never commit `config.js` with a real API key to a public repository.**

## 🎯 Performance

- Zero external runtime dependencies
- GPU-accelerated CSS animations (`transform`, `opacity`, `backdrop-filter`)
- Minimal DOM updates — only changed elements are touched
- Inline SVG icons — no additional network requests for icons
- Lazy geolocation — only triggered on user action

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|:--|:--|
| **Desktop** (> 900 px) | Full 3-column grid: sidebar · hero · data panel |
| **Tablet** (≤ 900 px) | Narrower right sidebar (260 px), compact hero text |
| **Mobile** (≤ 640 px) | 2-column grid, right sidebar hidden |

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📝 License

This project is open source under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Jyotirmoy Laha**
- GitHub: [@JyotirmoyLaha](https://github.com/JyotirmoyLaha)
- Email: jyotirmoy713128@gmail.com
- Project: [j.weather](https://github.com/JyotirmoyLaha/j.weather)
- Live Demo: [https://j-weather.onrender.com/](https://j-weather.onrender.com/)

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) – Weather & air quality data provider
- [Google Fonts](https://fonts.google.com/) – Plus Jakarta Sans typeface
- [Unsplash](https://unsplash.com/) – Dynamic hero background photographs
- [Render](https://render.com/) – Cloud hosting platform

---

*Built with ❤️ by Jyotirmoy Laha · © 2025 J.SkyCast*

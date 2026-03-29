<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a1a,50:0ea5e9,100:06b6d4&height=200&section=header&text=J.SkyCast&fontSize=80&fontColor=ffffff&fontAlignY=35&desc=Premium%20Weather%20Dashboard&descAlignY=60&descSize=20" />

[![Live Demo](https://img.shields.io/badge/🌤️_Live_Demo-j--weather.onrender.com-0ea5e9?style=for-the-badge)](https://j-weather.onrender.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

> *Real-time weather. Zero dependencies. Pure glassmorphism.*

</div>

---

## 🌍 What is J.SkyCast?

J.SkyCast is a **production-grade weather dashboard** built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no bundlers, no build steps. It features a premium glassmorphism design system, real-time weather data, air quality monitoring, and dynamic sky visuals that adapt to live conditions.

---

## 💡 Project Highlights

| | |
|:--|:--|
| 🪟 **Glassmorphism UI** | Frosted-glass cards, translucent panels, ambient glows |
| ⚡ **Zero Dependencies** | Pure HTML + CSS + Vanilla JS — nothing else |
| 🎨 **Dynamic Theming** | Backgrounds adapt to live weather conditions |
| 🔐 **Secure** | API keys git-ignored with Base64 fallback for production |
| 🚀 **CI/CD Deployed** | Live on Render with continuous deployment |
| 🏗️ **Clean Architecture** | Modular, documented, separation of concerns |

---

## ✨ Features

### 🌤️ Core Functionality
- **Real-time Weather** — Current conditions for any city via WeatherAPI
- **3-Day Forecast** — Interactive strip with SVG temperature graph
- **Geolocation** — One-click instant local weather
- **Air Quality Index** — EPA-standard AQI with CO, NO₂, O₃ breakdown
- **Comprehensive Metrics** — Humidity, wind, UV index, pressure, dew point, cloud cover
- **Sunrise / Sunset** — Animated sun arc with real-time position dot

### 🎨 Design & UI/UX
- **CSS Grid Dashboard** — Left nav (60px) · Hero panel · Right sidebar (320px)
- **Dynamic Hero** — Unsplash sky photos swap based on weather condition
- **Inline SVG Icons** — Hand-crafted, zero external icon requests
- **Micro-animations** — `slideUpFade` entrances, hover transforms, smooth transitions
- **Plus Jakarta Sans** — Modern variable-weight typography (300–800)

### ⚙️ Technical Excellence
- **Async/Await** — Modern JS with robust error handling
- **Fetch API** — Native HTTP, no external libraries
- **SVG Graph Rendering** — Programmatic polyline with gradient fill
- **Browser APIs** — Geolocation + CSS custom properties
- **Responsive** — Tablet (≤900px) and Mobile (≤640px) via pure CSS

---

## 🛠️ Tech Stack
```
├── HTML5          Semantic markup, accessibility attributes
├── CSS3           Grid · Flexbox · Custom Properties · Glassmorphism · Animations
├── JavaScript     ES6+ — async/await · destructuring · template literals
├── Google Fonts   Plus Jakarta Sans (variable weight)
└── WeatherAPI     Real-time weather · forecast · air quality data
```

> **No build step • No frameworks • No bundlers.** Open `index.html` and go.

---

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

---

## 🚀 Quick Start

**No installation needed →** [https://j-weather.onrender.com/](https://j-weather.onrender.com/)

### Local Development
```bash
# 1. Clone
git clone https://github.com/JyotirmoyLaha/j.weather.git
cd j.weather

# 2. Setup API key (optional — fallback key embedded)
cp config.example.js config.js
# Edit config.js with your key from https://www.weatherapi.com/

# 3. Serve locally
python -m http.server 8787
# or
npx http-server -p 8787

# 4. Open
# http://localhost:8787
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|:-----------|:-------|
| **Desktop** (> 900px) | Full 3-column: sidebar · hero · data panel |
| **Tablet** (≤ 900px) | Narrower sidebar (260px), compact hero |
| **Mobile** (≤ 640px) | 2-column grid, right sidebar hidden |

---

## 🔐 Security

- ✅ API keys stored in `config.js` (git-ignored)
- ✅ Base64-encoded fallback for production
- ✅ Graceful degradation when `config.js` is missing
- ✅ Comprehensive error handling for invalid credentials

> **⚠️ Never commit `config.js` with a real API key to a public repository.**

---

## 🎯 Performance

- Zero external runtime dependencies
- GPU-accelerated CSS (`transform`, `opacity`, `backdrop-filter`)
- Minimal DOM updates — only changed elements are touched
- Inline SVGs — no network requests for icons
- Lazy geolocation — triggered only on user action

---

## 🙏 Acknowledgments

[WeatherAPI.com](https://www.weatherapi.com/) · [Google Fonts](https://fonts.google.com/) · [Unsplash](https://unsplash.com/) · [Render](https://render.com/)

---

## 👨‍💻 Author

<div align="center">

**Jyotirmoy Laha**

[![GitHub](https://img.shields.io/badge/GitHub-JyotirmoyLaha-181717?style=for-the-badge&logo=github)](https://github.com/JyotirmoyLaha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jyotirmoylaha2005-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/jyotirmoylaha2005)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-0ea5e9?style=for-the-badge&logo=vercel)](https://jyotirmoy-portfolio.onrender.com)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,50:0ea5e9,100:0a0a1a&height=100&section=footer" />

</div>

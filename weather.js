// SkyCast Weather Application
// Secure version with external API key configuration

// Check if CONFIG is loaded (for local development)
// For production, we'll use a different approach
let API_KEY;

if (typeof CONFIG !== 'undefined' && CONFIG.WEATHER_API_KEY && CONFIG.WEATHER_API_KEY !== 'YOUR_API_KEY_HERE') {
    API_KEY = CONFIG.WEATHER_API_KEY;
    console.log('Using API key from config.js');
} else {
    // For production deployment (Render), embed the key here temporarily
    // This is decoded at runtime to provide basic obfuscation
    const encodedKey = 'NjgzNDU2NDMwMDk3ZTRjYzhhMzMxNTI2NTQyNTEwMTI=';
    API_KEY = atob(encodedKey);
    console.log('Using embedded API key for production');
}

const DEFAULT_CITY = (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_CITY) ? CONFIG.DEFAULT_CITY : 'Kolkata';

// Security: Disable right-click and common dev tools shortcuts (basic protection only)
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const locationBtn = document.getElementById('locationBtn');
const weatherContent = document.getElementById('weatherContent');
const loader = document.getElementById('loader');
const loadingText = document.getElementById('loadingText');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const bgContainer = document.getElementById('bgContainer');
const orb1 = document.getElementById('orb1');
const orb2 = document.getElementById('orb2');
const orb3 = document.getElementById('orb3');

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(DEFAULT_CITY);
    createAmbientParticles();
});

// Search form submission
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

// Location button click
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showLoading('Acquiring coordinates...');
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeather(`${latitude},${longitude}`);
            },
            error => {
                let message = 'Location access denied.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location permission denied. Please enable it in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        message = 'The request to get user location timed out.';
                        break;
                }
                showError(message);
            }
        );
    } else {
        showError('Geolocation is not supported by this browser.');
    }
});

// Main weather fetch function
async function fetchWeather(query) {
    showLoading('Scanning satellite data...');
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=yes`
        );

        if (!response.ok) {
            let errorMsg = 'Failed to fetch weather data';
            try {
                const errorData = await response.json();
                errorMsg = errorData.error.message;
            } catch {
                errorMsg = `Error ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        updateUI(data);
        showContent();
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

// Create ambient particles
function createAmbientParticles() {
    const container = document.getElementById('bgContainer');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 15 + 10 + 's';
        const delay = Math.random() * 10 + 's';
        
        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = left;
        particle.style.animationDuration = duration;
        particle.style.animationDelay = delay;
        
        container.appendChild(particle);
    }
}

// Update background theme based on weather
function updateBackgroundTheme(condition, isDay) {
    const code = condition.code;
    const text = condition.text.toLowerCase();
    
    let orb1Color, orb2Color, orb3Color, baseColor;
    let showRain = false;
    let showClouds = false;
    
    bgContainer.classList.remove('rain-active', 'clouds-active');
    
    if (!isDay) {
        // Night themes
        baseColor = '#0f172a';
        if (text.includes('rain') || text.includes('drizzle')) {
            orb1Color = '#1e3a8a';
            orb2Color = '#334155';
            orb3Color = '#3b82f6';
            showRain = true;
        } else if (text.includes('cloud') || text.includes('overcast')) {
            orb1Color = '#312e81';
            orb2Color = '#4c1d95';
            orb3Color = '#6366f1';
            showClouds = true;
        } else {
            orb1Color = '#1e293b';
            orb2Color = '#334155';
            orb3Color = '#60a5fa';
        }
    } else {
        // Day themes
        baseColor = '#0ea5e9';
        if (text.includes('sunny') || text.includes('clear')) {
            orb1Color = '#eab308';
            orb2Color = '#f97316';
            orb3Color = '#3b82f6';
        } else if (text.includes('rain') || text.includes('drizzle')) {
            orb1Color = '#334155';
            orb2Color = '#475569';
            orb3Color = '#cbd5e1';
            showRain = true;
        } else if (text.includes('snow') || text.includes('ice')) {
            orb1Color = '#1e40af';
            orb2Color = '#e2e8f0';
            orb3Color = '#f8fafc';
            showRain = true;
        } else if (text.includes('cloud') || text.includes('overcast')) {
            orb1Color = '#64748b';
            orb2Color = '#cbd5e1';
            orb3Color = '#1e40af';
            showClouds = true;
        } else {
            orb1Color = '#3b82f6';
            orb2Color = '#3b82f6';
            orb3Color = '#60a5fa';
        }
    }
    
    orb1.style.background = orb1Color;
    orb2.style.background = orb2Color;
    orb3.style.background = orb3Color;
    bgContainer.style.background = baseColor;
    
    if (showRain) bgContainer.classList.add('rain-active');
    if (showClouds) bgContainer.classList.add('clouds-active');
}

// Update UI with weather data
function updateUI(data) {
    // Update background theme
    updateBackgroundTheme(data.current.condition, data.current.is_day);
    
    // Location and time
    document.getElementById('locationName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('localTime').textContent = data.location.localtime;
    
    // Temperature and weather icon
    document.getElementById('temperature').textContent = `${Math.round(data.current.temp_c)}°`;
    document.getElementById('weatherIcon').src = `https:${data.current.condition.icon}`;
    document.getElementById('conditionText').textContent = data.current.condition.text;
    document.getElementById('feelsLike').textContent = `${Math.round(data.current.feelslike_c)}°`;
    
    // Air Quality Index
    const aqiValue = data.current.air_quality['us-epa-index'];
    const aqiDetails = getAQIDetails(aqiValue);
    
    document.getElementById('aqiStatus').textContent = aqiDetails.text;
    document.getElementById('aqiStatus').className = 'text-2xl font-bold transition-colors duration-300 ' + aqiDetails.color;
    document.getElementById('aqiScore').textContent = aqiValue;
    document.getElementById('aqiIcon').className = 'fas fa-lungs ' + aqiDetails.color;
    
    const aqiPercentage = (aqiValue / 6) * 100;
    document.getElementById('aqiProgress').style.width = `${aqiPercentage}%`;
    
    document.getElementById('coLevel').textContent = Math.round(data.current.air_quality.co);
    document.getElementById('no2Level').textContent = Math.round(data.current.air_quality.no2);
    document.getElementById('o3Level').textContent = Math.round(data.current.air_quality.o3);
    
    const aqiGlowColor = aqiDetails.rawColor || 'rgba(74, 222, 128, 0.2)';
    document.getElementById('aqiGlow').style.backgroundColor = aqiGlowColor;
    
    // Current conditions
    document.getElementById('windValue').textContent = `${data.current.wind_kph} km/h`;
    document.getElementById('windDir').textContent = data.current.wind_dir;
    document.getElementById('humidityValue').textContent = `${data.current.humidity}%`;
    document.getElementById('uvValue').textContent = data.current.uv;
    document.getElementById('uvText').textContent = getUVText(data.current.uv);
    document.getElementById('visValue').textContent = `${data.current.vis_km} km`;
    document.getElementById('pressureValue').textContent = `${data.current.pressure_mb} mb`;
    document.getElementById('precipValue').textContent = `${data.current.precip_mm} mm`;
}

// Get AQI details
function getAQIDetails(value) {
    const aqiLevels = {
        1: { text: 'Good', color: 'text-green-400', rawColor: 'rgba(74, 222, 128, 0.2)' },
        2: { text: 'Moderate', color: 'text-yellow-400', rawColor: 'rgba(250, 204, 21, 0.2)' },
        3: { text: 'Unhealthy for Sensitive', color: 'text-orange-400', rawColor: 'rgba(251, 146, 60, 0.2)' },
        4: { text: 'Unhealthy', color: 'text-red-400', rawColor: 'rgba(248, 113, 113, 0.2)' },
        5: { text: 'Very Unhealthy', color: 'text-purple-400', rawColor: 'rgba(192, 132, 252, 0.2)' },
        6: { text: 'Hazardous', color: 'text-rose-600', rawColor: 'rgba(225, 29, 72, 0.2)' }
    };
    return aqiLevels[value] || { text: 'Unknown', color: 'text-slate-400', rawColor: 'rgba(148, 163, 184, 0.2)' };
}

// Get UV index text
function getUVText(uv) {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
}

// UI State Management
function showLoading(text) {
    if (text) loadingText.textContent = text;
    loader.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

function showContent() {
    loader.classList.add('hidden');
    errorDiv.classList.add('hidden');
    weatherContent.classList.remove('hidden');
    
    // Trigger animations
    const animatedElements = document.querySelectorAll('.animate-enter');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
}

function showError(message) {
    loader.classList.add('hidden');
    weatherContent.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    errorMessage.textContent = message;
}

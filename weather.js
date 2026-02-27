// ─────────────────────────────────────────────────────────────────
// J.SkyCast – Premium Weather Dashboard
// Glassmorphism UI Edition
// ─────────────────────────────────────────────────────────────────

// ── API KEY ────────────────────────────────────────────────────
let API_KEY;
if (typeof CONFIG !== 'undefined' && CONFIG.WEATHER_API_KEY && CONFIG.WEATHER_API_KEY !== 'YOUR_API_KEY_HERE') {
    API_KEY = CONFIG.WEATHER_API_KEY;
} else {
    const encodedKey = 'MzM4NTllMDUyNGM2NDRhZGE0NTE5MDAzNzI2MjIwMg==';
    API_KEY = atob(encodedKey);
}

const DEFAULT_CITY = (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_CITY) ? CONFIG.DEFAULT_CITY : 'Kolkata';

// ── SECURITY ──────────────────────────────────────────────────
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode === 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) return false;
};

// ── DOM REFS ──────────────────────────────────────────────────
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const locationBtn = document.getElementById('locationBtn');
const weatherContent = document.getElementById('weatherContent');
const loader = document.getElementById('loader');
const loadingText = document.getElementById('loadingText');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const heroBg = document.getElementById('heroBg');

// ── WEATHER BACKGROUND MAP ─────────────────────────────────────
// Curated Unsplash photo IDs per weather condition – reliable, beautiful sky images
const WEATHER_IMAGES = {
    thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1600&auto=format&fit=crop&q=80',  // Dark storm clouds
    rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1600&auto=format&fit=crop&q=80',  // Rainy window cityscape
    snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1600&auto=format&fit=crop&q=80',  // Snowy white landscape
    fog: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1600&auto=format&fit=crop&q=80',  // Misty atmospheric forest
    overcast: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&auto=format&fit=crop&q=80',  // Heavy grey clouds
    cloudy: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&auto=format&fit=crop&q=80',  // Dramatic sky with clouds
    clear_day: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80',  // Gorgeous clear blue sky
    clear_night: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1600&auto=format&fit=crop&q=80',  // Starry night sky
    default: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&auto=format&fit=crop&q=80',  // Dramatic sky fallback
};

function getWeatherImageUrl(conditionText, isDay) {
    const c = conditionText.toLowerCase();
    if (c.includes('thunder') || c.includes('storm')) return WEATHER_IMAGES.thunderstorm;
    if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return WEATHER_IMAGES.rain;
    if (c.includes('snow') || c.includes('sleet') || c.includes('ice')) return WEATHER_IMAGES.snow;
    if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return WEATHER_IMAGES.fog;
    if (c.includes('overcast')) return WEATHER_IMAGES.overcast;
    if (c.includes('cloud') || c.includes('partly')) return WEATHER_IMAGES.cloudy;
    if (c.includes('sunny') || c.includes('clear')) return isDay ? WEATHER_IMAGES.clear_day : WEATHER_IMAGES.clear_night;
    return WEATHER_IMAGES.default;
}

// Hero headline & description from condition
function getHeroText(conditionText, tempC) {
    const c = conditionText.toLowerCase();
    let headline = conditionText;
    let sub = '';

    if (c.includes('thunder') || c.includes('storm')) {
        headline = 'Thunderstorm Warning';
        sub = 'Severe storm activity detected in your area. Strong lightning and heavy rainfall expected. Stay indoors and avoid travel until conditions improve.';
    } else if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) {
        headline = 'Rainy Day Ahead';
        sub = 'Persistent rainfall expected throughout the day. Carry an umbrella and allow extra travel time. Roads may be wet and slippery in spots.';
    } else if (c.includes('snow') || c.includes('sleet') || c.includes('blizzard')) {
        headline = 'Snowy Conditions';
        sub = 'Snowfall is bringing a winter wonderland to your area. Dress in warm layers and be cautious on icy roads and walkways.';
    } else if (c.includes('fog') || c.includes('mist') || c.includes('haze')) {
        headline = 'Low Visibility Fog';
        sub = 'Dense fog is reducing visibility to below 500 metres. Drive with headlights on and reduce speed. Conditions should clear by mid-morning.';
    } else if (c.includes('overcast')) {
        headline = 'Overcast Skies';
        sub = 'A thick blanket of clouds is covering the sky today. No rain expected but sunlight will remain low. A great day for indoor activities.';
    } else if (c.includes('cloud') || c.includes('partly')) {
        headline = 'Partially Cloudy';
        sub = 'A pleasant mix of sun and clouds is expected today. Temperatures are comfortable and conditions are good for outdoor activities.';
    } else if (c.includes('sunny') || c.includes('clear')) {
        headline = 'Bright & Clear Sky';
        sub = `Sky conditions look perfect today with ${Math.round(tempC)}°C temperatures. Excellent visibility and gentle breezes make it a beautiful day to be outside.`;
    } else {
        headline = conditionText;
        sub = 'Current weather conditions are being tracked live. Stay updated with the latest forecasts from J.SkyCast for your location.';
    }

    return { headline, sub };
}

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(DEFAULT_CITY);
});

// ── SEARCH ─────────────────────────────────────────────────────
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.blur();
    }
});

// ── GEOLOCATION ────────────────────────────────────────────────
locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser.');
        return;
    }
    showLoading('Acquiring coordinates…');
    navigator.geolocation.getCurrentPosition(
        pos => fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
        err => {
            const msgs = {
                [err.PERMISSION_DENIED]: 'Location permission denied.',
                [err.POSITION_UNAVAILABLE]: 'Location information unavailable.',
                [err.TIMEOUT]: 'Location request timed out.',
            };
            showError(msgs[err.code] || 'Location access denied.');
        }
    );
});

// ── MAIN FETCH ─────────────────────────────────────────────────
async function fetchWeather(query) {
    showLoading('Scanning satellite data…');
    try {
        // Fetch current + 7-day forecast + AQI in one call
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=yes`
        );
        if (!res.ok) {
            let msg = 'Failed to fetch weather data.';
            try {
                const err = await res.json();
                msg = err.error.message;
                if ([1003, 2006, 2008].includes(err.error.code)) msg = 'Invalid or expired API key.';
            } catch { msg = `Error ${res.status}: ${res.statusText}`; }
            throw new Error(msg);
        }
        const data = await res.json();
        updateUI(data);
        showContent();
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

// ── UI UPDATE ──────────────────────────────────────────────────
function updateUI(data) {
    const { location, current, forecast } = data;
    const conditionText = current.condition.text;
    const isDay = Boolean(current.is_day);

    // ── Background image (Unsplash + teal gradient fallback)
    const imgUrl = getWeatherImageUrl(conditionText, isDay);
    heroBg.style.background = `
        url('${imgUrl}') center/cover no-repeat,
        linear-gradient(135deg, #0f2e3a 0%, #1a4a5c 40%, #2d6b74 100%)
    `;

    // ── Hero text
    const { headline, sub } = getHeroText(conditionText, current.temp_c);
    document.getElementById('heroHeadline').textContent = headline;
    document.getElementById('heroSub').textContent = sub;

    // ── Strip location / time
    document.getElementById('stripLocation').textContent = `${location.name}, ${location.country}`;
    // date/time display removed from UI
    // document.getElementById('stripTime').textContent = location.localtime;

    // ── Primary card: city / country
    document.getElementById('primaryCity').textContent = location.name;
    document.getElementById('primaryCountry').textContent = location.country;

    // ── Primary Card: temp, icon, condition, feelsLike
    document.getElementById('primaryTemp').textContent = `${Math.round(current.temp_c)}°`;
    const icon = document.getElementById('primaryIcon');
    icon.src = `https:${current.condition.icon}`;
    icon.alt = conditionText;
    document.getElementById('primaryCondition').textContent = conditionText;
    document.getElementById('primaryFeels').textContent = `${Math.round(current.feelslike_c)}°`;

    // ── Stats row
    document.getElementById('statWind').textContent = `${current.wind_kph} km/h`;
    document.getElementById('statHumidity').textContent = `${current.humidity}%`;
    document.getElementById('statUV').textContent = current.uv;
    document.getElementById('statVis').textContent = `${current.vis_km} km`;

    // ── Pressure / Precip
    document.getElementById('pressureValue').textContent = `${current.pressure_mb} mb`;
    document.getElementById('precipValue').textContent = `${current.precip_mm} mm`;

    // ── AQI
    if (current.air_quality) {
        const aqi = current.air_quality['us-epa-index'];
        const aqiDetail = getAQIDetails(aqi);
        document.getElementById('aqiStatus').textContent = aqiDetail.text;
        document.getElementById('aqiStatus').style.color = aqiDetail.hex;
        document.getElementById('aqiProgress').style.width = `${(aqi / 6) * 100}%`;
        document.getElementById('coLevel').textContent = Math.round(current.air_quality.co);
        document.getElementById('no2Level').textContent = Math.round(current.air_quality.no2);
        document.getElementById('o3Level').textContent = Math.round(current.air_quality.o3);
    }

    // ── Expanded detail grid
    document.getElementById('windDirVal').textContent = current.wind_dir || '—';
    document.getElementById('dewPointVal').textContent = `${Math.round(current.dewpoint_c ?? current.feelslike_c)}°`;
    document.getElementById('cloudVal').textContent = `${current.cloud}%`;
    // Format local time using timezone to avoid cached API time issues
    if (window.localTimeInterval) clearInterval(window.localTimeInterval);
    const updateLocalTime = () => {
        try {
            const timeStr = new Date().toLocaleTimeString('en-US', {
                timeZone: location.tz_id,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            document.getElementById('localTimeVal').textContent = timeStr;
        } catch (e) {
            const timePart = location.localtime ? location.localtime.split(' ')[1] : '—';
            document.getElementById('localTimeVal').textContent = timePart;
        }
    };
    updateLocalTime();
    window.localTimeInterval = setInterval(updateLocalTime, 1000);

    // ── Sunrise / Sunset
    const todayForecast = forecast.forecastday[0];
    if (todayForecast && todayForecast.astro) {
        const { sunrise, sunset } = todayForecast.astro;
        document.getElementById('sunriseVal').textContent = sunrise;
        document.getElementById('sunsetVal').textContent = sunset;
        renderSunPosition(sunrise, sunset, location.localtime);
    }

    // ── Forecast strip
    renderForecast(forecast.forecastday);
}

// ── FORECAST STRIP ─────────────────────────────────────────────
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderForecast(days) {
    const container = document.getElementById('forecastDays');
    container.innerHTML = '';

    const temps = days.map(d => Math.round(d.day.avgtemp_c));
    const todayIdx = 0; // First is today

    days.forEach((day, i) => {
        const date = new Date(day.date);
        const dayName = i === 0 ? 'Today' : DAY_NAMES[date.getDay()];
        const temp = temps[i];
        const isToday = i === todayIdx;

        const el = document.createElement('div');
        el.className = 'forecast-day' + (isToday ? ' today' : '');
        el.innerHTML = `
            <span class="day-name">${dayName}</span>
            <img class="day-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <span class="day-temp">${temp}°</span>
        `;
        container.appendChild(el);
    });

    // Draw SVG line graph
    renderForecastGraph(temps);
}

function renderForecastGraph(temps) {
    const svg = document.getElementById('forecastGraph');
    const W = svg.parentElement.offsetWidth || 600;
    const H = 44;
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const range = (max - min) || 1;
    const n = temps.length;

    // X positions correspond to centers of forecast day columns
    const xs = temps.map((_, i) => {
        const colW = W / n;
        return colW * i + colW / 2;
    });
    const ys = temps.map(t => H - ((t - min) / range) * (H - 10) - 5);

    // Build smooth path
    let d = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < n; i++) {
        const cpx = (xs[i - 1] + xs[i]) / 2;
        d += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
    }

    // Area path (filled)
    let area = d + ` L ${xs[n - 1]} ${H} L ${xs[0]} ${H} Z`;

    svg.innerHTML = `
        <path class="graph-area" d="${area}"/>
        <path d="${d}"/>
        ${xs.map((x, i) => `<circle cx="${x}" cy="${ys[i]}" r="3"/>`).join('')}
    `;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
}

// ── AQI HELPER ─────────────────────────────────────────────────
function getAQIDetails(value) {
    const map = {
        1: { text: 'Good', hex: '#4ade80' },
        2: { text: 'Moderate', hex: '#facc15' },
        3: { text: 'Unhealthy (Sensitive)', hex: '#fb923c' },
        4: { text: 'Unhealthy', hex: '#f87171' },
        5: { text: 'Very Unhealthy', hex: '#c084fc' },
        6: { text: 'Hazardous', hex: '#e11d48' },
    };
    return map[value] || { text: 'Unknown', hex: '#94a3b8' };
}


// ── SUN POSITION RENDERER ──────────────────────────────────────
function renderSunPosition(sunriseStr, sunsetStr, localTimeStr) {
    function parseTime(str) {
        if (!str) return null;
        const m = str.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (!m) return null;
        let h = parseInt(m[1]), min = parseInt(m[2]);
        const ap = (m[3] || '').toUpperCase();
        if (ap === 'PM' && h !== 12) h += 12;
        if (ap === 'AM' && h === 12) h = 0;
        return h * 60 + min;
    }
    const rise = parseTime(sunriseStr);
    const set = parseTime(sunsetStr);
    const now = parseTime(localTimeStr ? localTimeStr.split(' ')[1] : null);
    if (rise === null || set === null || now === null) return;

    const progress = Math.max(0, Math.min(1, (now - rise) / (set - rise)));
    const bar = document.getElementById('sunProgressFill');
    if (bar) bar.style.width = `${progress * 100}%`;

    // Quadratic bezier: M15,72 Q100,-5 185,72
    const t = progress;
    const x = (1 - t) * (1 - t) * 15 + 2 * t * (1 - t) * 100 + t * t * 185;
    const y = (1 - t) * (1 - t) * 72 + 2 * t * (1 - t) * (-5) + t * t * 72;
    const dot = document.getElementById('sunPosDot');
    const glow = document.getElementById('sunGlowRing');
    if (dot) { dot.setAttribute('cx', x.toFixed(1)); dot.setAttribute('cy', y.toFixed(1)); }
    if (glow) { glow.setAttribute('cx', x.toFixed(1)); glow.setAttribute('cy', y.toFixed(1)); }
}
// ── LOCATION CARDS (fetch live data for 3 cities) ──────────────
const STATIC_CITIES = [
    { id: 'loc1', query: 'London', flag: '🇬🇧', country: 'United Kingdom' },
    { id: 'loc2', query: 'New York', flag: '🇺🇸', country: 'United States' },
    { id: 'loc3', query: 'Tokyo', flag: '🇯🇵', country: 'Japan' },
];

function setupLocationCards() {
    STATIC_CITIES.forEach(({ id, query, flag, country }) => {
        fetchLocationCard(id, query, flag, country);
    });

    // Click to search
    document.querySelectorAll('.loc-city[data-loc]').forEach(el => {
        el.closest('.loc-card').addEventListener('click', () => {
            const city = el.dataset.loc;
            fetchWeather(city);
        });
    });
}

async function fetchLocationCard(id, query, flag, country) {
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`
        );
        if (!res.ok) return;
        const data = await res.json();
        const card = document.getElementById('locationCards').children[STATIC_CITIES.findIndex(c => c.id === id)];
        const condEl = card.querySelector('.loc-cond');
        const tempEl = card.querySelector('.loc-temp');
        const iconEl = card.querySelector('.loc-icon');
        if (condEl) condEl.textContent = data.current.condition.text;
        if (tempEl) tempEl.textContent = `${Math.round(data.current.temp_c)}°`;
        if (iconEl) { iconEl.src = `https:${data.current.condition.icon}`; }
    } catch { /* fail silently – static defaults remain */ }
}

// ── STATE MANAGEMENT ───────────────────────────────────────────
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

    // Re-trigger slide-up animations
    document.querySelectorAll('.animate-enter').forEach(el => {
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = '';
    });

    // Re-render the graph once layout is settled
    setTimeout(() => {
        const tempEls = document.querySelectorAll('.day-temp');
        if (tempEls.length) {
            const temps = [...tempEls].map(el => parseInt(el.textContent));
            renderForecastGraph(temps);
        }
    }, 150);
}

function showError(message) {
    loader.classList.add('hidden');
    weatherContent.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    errorMessage.textContent = message;
}

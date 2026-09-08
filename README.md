# Weather Intelligence App

A responsive, high-performance web application that delivers real-time weather metrics, an interactive 7-day forecast trend visualization, and rule-based planning recommendations for any city worldwide.

---

## 1. Project Overview

The **Weather Intelligence App** provides fast, reliable weather intelligence without relying on heavy backend infrastructure, paid subscriptions, or proprietary artificial intelligence models. Designed with clean typography, responsive layouts, and intuitive controls, it allows users to quickly search for any global city and receive actionable insights to plan their outdoor days, travel, or daily commute.

---

## 2. Key Features

- **City Geocoding & Search**: Instant search for any city or town worldwide, with disambiguation support for duplicate city names.
- **Full Location Metadata**: Displays city name, administrative region, country, latitude, longitude, and local timezone.
- **Current Weather Snapshot**: Real-time temperature, apparent ("feels-like") temperature, relative humidity, precipitation rate, WMO weather condition badges, and wind speed.
- **7-Day Forecast Grid**: Daily breakdown including high/low temperature bounds, WMO condition classification, precipitation probability percentages, and maximum wind velocity.
- **Interactive Weather Trend Visualization**: High-precision SVG/Canvas chart rendered with Recharts, visualizing maximum and minimum temperature curves and rain probability trajectories across the 7-day horizon.
- **Rule-Based Weather Intelligence & Recommendations**: Simple, deterministic application logic that derives human-friendly planning advice (e.g., umbrella advisories, heat precautions, cold-weather bundling, wind alerts, and optimal outdoor activity days).
- **Metric / Imperial Unit Toggle**: Seamless switching between Metric (°C, km/h, mm) and Imperial (°F, mph, in) standards.
- **Robust Error Handling & Skeletons**: Friendly notices for unknown cities, empty queries, or network timeouts, complete with retry shortcuts and quick-suggestion city chips.
- **Cloudflare Pages & GitHub Ready**: Pure static client-side SPA with zero server secrets.

---

## 3. APIs Used

The application relies exclusively on open, free, and public APIs provided by **Open-Meteo**:

1. **Open-Meteo Geocoding API**
   - **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
   - **Purpose**: Converts user-entered city names into geographic coordinates (latitude, longitude, country, state, timezone).

2. **Open-Meteo Forecast API**
   - **Endpoint**: `https://api.open-meteo.com/v1/forecast`
   - **Purpose**: Fetches real-time current conditions and daily 7-day forecast projections.

> **Statement on API Keys**:
> This application **does not require any private or paid API keys**, Google Cloud credentials, or Gemini API keys. Open-Meteo is a public, open-source meteorological service accessible directly via standard HTTPS requests.

---

## 4. How the Application Works

1. **Geocoding Step**:
   When the user submits a city name (e.g., "Paris" or "Tokyo"), the application queries the Open-Meteo Geocoding API with `count=5`. The response provides matched locations, administrative areas, and coordinates.

2. **Forecast Retrieval**:
   Using the latitude, longitude, and detected timezone, the app issues a request to the Open-Meteo Forecast API requesting `current` metrics (`temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `precipitation`, `weather_code`, `wind_speed_10m`) and `daily` metrics (`temperature_2m_max`, `temperature_2m_min`, `precipitation_probability_max`, `wind_speed_10m_max`, `precipitation_sum`, `uv_index_max`).

3. **Condition Classification**:
   WMO weather codes (0–99) are mapped to human-readable condition titles, descriptive summaries, and Lucide icons using a specialized mapping module.

4. **Deterministic Recommendation Engine**:
   The application analyzes the weather metrics using deterministic conditional logic:
   - *Precipitation Active / Rain Expected*: Advises carrying an umbrella or rain jacket.
   - *High Temperatures (> 30°C / 86°F)*: Recommends hydration and avoiding peak sun hours.
   - *Cold (< 10°C / 50°F) or Freezing (≤ 0°C / 32°F)*: Advises layered thermal clothing and warns of icy surfaces.
   - *High Wind (> 35 km/h / 22 mph)*: Recommends caution during outdoor activities.
   - *Mild Conditions (17°C–26°C, low rain, calm wind)*: Highlights optimal conditions for walks, exercise, or outdoor dining.
   - *7-Day Highlights*: Identifies upcoming days with the lowest rain risk and ideal temperatures.

5. **Visual Trend Chart**:
   Recharts calculates smooth temperature and precipitation probability curves with interactive tooltip previews.

---

## 5. Local Setup Instructions

### Prerequisites
- Node.js version 18 or higher
- npm (bundled with Node.js)

### Installation Steps

1. Clone or extract the project files to your local machine:
   ```bash
   cd weather-intelligence-app
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 6. Build Instructions

To generate an optimized, static production build:

```bash
npm run build
```

This compiles TypeScript, processes Tailwind CSS, and outputs static assets into the `dist/` folder.

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 7. Google AI Studio to GitHub Workflow

If you developed or modified this project inside Google AI Studio:

1. **Export to GitHub**:
   - In Google AI Studio, click on the **Settings** or **Project** menu in the top navigation.
   - Select **Export to GitHub** (or download as ZIP).
   - If connecting directly, authorize GitHub and choose your repository name (e.g. `weather-intelligence-app`).
2. **Alternative: Push via Local Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Weather Intelligence App"
   git branch -M main
   git remote add origin https://github.com/<your-username>/weather-intelligence-app.git
   git push -u origin main
   ```

---

## 8. GitHub to Cloudflare Pages Deployment Instructions

Cloudflare Pages provides global hosting for static Vite applications:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, navigate to **Compute (Workers & Pages)** > **Pages**.
3. Click **Connect to Git** and authorize your GitHub account.
4. Select your repository (`weather-intelligence-app`).
5. Configure the **Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave default)
6. **Environment Variables**:
   - Leave empty. No environment variables or API keys are required!
7. Click **Save and Deploy**.
8. Cloudflare will build the site in seconds and provide a live production URL (e.g., `https://weather-intelligence-app.pages.dev`).

---

## 9. Testing Instructions

| Test Case | Steps | Expected Result |
| :--- | :--- | :--- |
| **Initial Load** | Open the application in the browser. | Automatically loads the default city ("London") with current weather, recommendations, chart, and 7-day forecast. |
| **City Search** | Enter "Tokyo" and click "Search City" (or press Enter). | Coordinates update, location banner displays Tokyo, Japan, metrics update to Tokyo weather. |
| **Disambiguation** | Enter "Springfield". | Section shows multiple matching locations (e.g. Springfield US, Australia) with selection buttons. |
| **Invalid City** | Enter a nonexistent city name (e.g. "Xyzabcqwerty123"). | Friendly error card appears: *"City not found. Please check the city name and try again."* No technical crashes. |
| **Empty Search** | Clear input and attempt to search. | Button is disabled, or a friendly prompt asks to enter a city name. |
| **Unit Toggle** | Click the "°F" button in the top right. | Temperatures instantly re-render in Fahrenheit, wind in mph, and precipitation in inches. Click "°C" to return. |
| **Chart Switcher** | Click "Rain Probability (%)" on the 7-day chart. | Chart switches from temperature range to precipitation probability. |
| **Mobile Responsiveness** | Resize browser to mobile width (< 480px). | Layout adapts smoothly into a single-column view with touch-friendly controls. |

---

## 10. License & Attribution

- Weather data provided by [Open-Meteo.com](https://open-meteo.com/) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Open source application built with React, Vite, and Tailwind CSS.

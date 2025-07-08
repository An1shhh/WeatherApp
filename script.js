/**
 * Weather App
 * A modern weather application with light/dark mode toggle
 * Author: Mujeeb ul Habib
 * GitHub: https://github.com/mujeeeeeeeeeb
 * Features: Location-based weather search, temperature unit toggle, responsive design
 */

class WeatherApp {
    constructor() {
        this.API_KEY = ''; // Your OpenWeatherMap API key
        this.API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeTheme();
        this.updateDate();
    }

    initializeElements() {
        // Search elements
        this.locationInput = document.getElementById('locationInput');
        this.searchBtn = document.getElementById('searchBtn');
        
        // Weather display elements
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.locationName = document.getElementById('locationName');
        this.currentDate = document.getElementById('currentDate');
        this.temperature = document.getElementById('temperature');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.description = document.getElementById('description');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        
        // Loading and modal elements
        this.loading = document.getElementById('loading');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        
        // Theme toggle elements
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.themeText = this.themeToggle.querySelector('.theme-text');
        
        // Temperature toggle element
        this.tempToggle = document.getElementById('tempToggle');
        this.isMetric = true;
    }

    initializeEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Modal close
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Temperature toggle
        this.tempToggle.addEventListener('click', () => this.toggleTemperatureUnit());
        
        // Auto-focus on input
        this.locationInput.focus();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeToggle();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeToggle();
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeToggle() {
        if (this.currentTheme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeText.textContent = 'Light Mode';
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeText.textContent = 'Dark Mode';
        }
    }

    toggleTemperatureUnit() {
        this.isMetric = !this.isMetric;
        this.tempToggle.innerHTML = this.isMetric ? '°C / °F' : '°F / °C';
        
        // Update display if weather data is shown
        if (this.weatherDisplay.classList.contains('show')) {
            const currentTemp = this.temperature.textContent;
            const tempValue = parseInt(currentTemp);
            if (!isNaN(tempValue)) {
                const newTemp = this.isMetric ? 
                    Math.round((tempValue - 32) * 5/9) : 
                    Math.round(tempValue * 9/5 + 32);
                this.temperature.textContent = `${newTemp}°${this.isMetric ? 'C' : 'F'}`;
                
                // Update feels like temperature
                const feelsLikeText = this.feelsLike.textContent;
                const feelsLikeMatch = feelsLikeText.match(/(-?\d+)/);
                if (feelsLikeMatch) {
                    const feelsLikeValue = parseInt(feelsLikeMatch[1]);
                    const newFeelsLike = this.isMetric ? 
                        Math.round((feelsLikeValue - 32) * 5/9) : 
                        Math.round(feelsLikeValue * 9/5 + 32);
                    this.feelsLike.textContent = `Feels like ${newFeelsLike}°${this.isMetric ? 'C' : 'F'}`;
                }
            }
        }
    }

    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDate.textContent = now.toLocaleDateString('en-US', options);
    }

    async handleSearch() {
        const location = this.locationInput.value.trim();
        
        if (!location) {
            this.showError('Please enter a location');
            return;
        }

        // Check if API key is set
        if (this.API_KEY === 'your_api_key_here') {
            this.showError('Please add your OpenWeatherMap API key');
            return;
        }

        this.showLoading();
        
        try {
            const weatherData = await this.fetchWeatherData(location);
            this.displayWeatherData(weatherData);
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showModal();
            console.error('Error fetching weather data:', error);
        }
    }

    async fetchWeatherData(location) {
        const units = this.isMetric ? 'metric' : 'imperial';
        const url = `${this.API_URL}?q=${encodeURIComponent(location)}&appid=${this.API_KEY}&units=${units}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Location not found');
            } else if (response.status === 401) {
                throw new Error('Invalid API key');
            }
            throw new Error('Failed to fetch weather data');
        }
        
        return await response.json();
    }

    displayWeatherData(data) {
        // Update location info
        this.locationName.textContent = `${data.name}, ${data.sys.country}`;
        
        // Update main weather info
        const tempValue = Math.round(data.main.temp);
        const feelsLikeValue = Math.round(data.main.feels_like);
        
        this.temperature.textContent = `${tempValue}°${this.isMetric ? 'C' : 'F'}`;
        this.description.textContent = data.weather[0].description;
        this.feelsLike.textContent = `Feels like ${feelsLikeValue}°${this.isMetric ? 'C' : 'F'}`;
        
        // Update weather icon
        this.updateWeatherIcon(data.weather[0].main, data.weather[0].icon);
        
        // Update details
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        
        // Show weather display with animation
        this.weatherDisplay.classList.add('show');
        
        // Clear search input
        this.locationInput.value = '';
    }

    updateWeatherIcon(weatherMain, iconCode) {
        const iconMap = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '🌫️',
            'Haze': '🌫️',
            'Dust': '🌫️',
            'Fog': '🌫️',
            'Sand': '🌫️',
            'Ash': '🌫️',
            'Squall': '💨',
            'Tornado': '🌪️'
        };
        
        const icon = iconMap[weatherMain] || '🌤️';
        this.weatherIcon.innerHTML = `<span>${icon}</span>`;
    }

    showLoading() {
        this.loading.classList.add('show');
        this.weatherDisplay.classList.remove('show');
    }

    hideLoading() {
        this.loading.classList.remove('show');
    }

    showModal() {
        this.modalOverlay.classList.add('show');
        // Focus trap for accessibility
        this.modalCloseBtn.focus();
    }

    closeModal() {
        this.modalOverlay.classList.remove('show');
        this.locationInput.focus();
    }

    showError(message) {
        // You can enhance this to show different types of errors
        console.error(message);
        this.showModal();
    }
}

// Initialize the weather app
document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherApp();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            app.locationInput.focus();
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            app.closeModal();
        }
    });
});

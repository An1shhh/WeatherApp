# 🌤️ Weather App

A modern, responsive weather application with light/dark mode toggle and temperature unit conversion. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **Search Functionality**: Search by city name with Enter key support
- **Dark/Light Mode**: Toggle between themes with persistent settings
- **Temperature Units**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Weather Icons**: Emoji-based weather icons for better visual representation
- **Detailed Information**: Shows temperature, humidity, wind speed, pressure, and visibility
- **Error Handling**: User-friendly error messages for invalid locations
- **Keyboard Shortcuts**: Ctrl/Cmd + K to focus search, Escape to close modals
- **Loading Animation**: Smooth loading indicator while fetching data

## 🚀 Demo

[Live Demo](https://your-weather-app.vercel.app) <!-- Replace with your actual Vercel URL -->

## ️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox
- **JavaScript (ES6+)**: Class-based architecture with async/await
- **OpenWeatherMap API**: Real-time weather data
- **Google Fonts**: Inter font family for modern typography

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mujeeeeeeeeeb/weather-app.git
   cd weather-app
   ```

2. **Get your API key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `script.js` (line 12)

3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server for development

## 🔧 Configuration

### API Key Setup

Replace the API key in `script.js`:

```javascript
this.API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
```

### Environment Variables (Optional)

For production deployment, you can use environment variables:

```javascript
this.API_KEY = process.env.OPENWEATHER_API_KEY || 'fallback_key';
```


## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with light/dark mode
├── script.js           # JavaScript functionality
├── .env               # Environment variables (optional)
└── README.md            # Project documentation
```

## 🎨 Customization

### Colors

Modify CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #f8fafc;
    --text-primary: #1e293b;
    --button-bg: #3b82f6;
    /* Add your custom colors */
}
```

### Weather Icons

Update the icon mapping in `script.js`:

```javascript
const iconMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    // Add more weather conditions
};
```

## 🎯 Usage

1. **Search for a city**: Type any city name in the search bar
2. **Press Enter** or click the "Go" button
3. **View weather details**: Temperature, humidity, wind speed, etc.
4. **Toggle theme**: Click the theme toggle button (🌙/☀️)
5. **Switch units**: Click the temperature toggle (°C/°F)
6. **Use keyboard shortcuts**:
   - `Ctrl/Cmd + K`: Focus search bar
   - `Escape`: Close error modal

## 🔍 API Reference

This app uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current):

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units={units}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your API key is valid and active
2. **CORS Issues**: Use a local server or deploy to avoid CORS problems
3. **Location Not Found**: Check spelling and try different city names
4. **Network Errors**: Check your internet connection

### Error Messages

- "Please enter a location" - Search input is empty
- "Location Not Found" - Invalid city name or API issue
- "Please configure your OpenWeatherMap API key" - API key not set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mujeeb ul Habib**
- GitHub: [@mujeeeeeeeeeb](https://github.com/mujeeeeeeeeeb)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Google Fonts](https://fonts.google.com/) for the Inter font
- [Vercel](https://vercel.com/) for hosting platform

## 📈 Future Enhancements

- [ ] 5-day weather forecast
- [ ] Geolocation support
- [ ] Weather history
- [ ] Favorite locations
- [ ] Weather alerts
- [ ] Offline support
- [ ] Voice search
- [ ] Weather maps integration
- [ ] Social sharing
- [ ] PWA (Progressive Web App) support

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/mujeeeeeeeeeb/weather-app.git

# Navigate to project directory
cd weather-app

# Open in your preferred code editor
code .

# Start a local server (optional)
python -m http.server 8000
# or
npx serve .
```

### Build Process

This is a vanilla JavaScript application, so no build process is required. Simply:

1. Update the API key
2. Test locally
3. Deploy to your preferred platform

---

Made with ❤️ by [Mujeeb ul Habib](https://github.com/mujeeeeeeeeeb)

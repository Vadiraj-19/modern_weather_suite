# modern_weather_suite

### Weather Forecast Application - Project Introduction

The **Weather Forecast Application** is a web-based tool designed to provide real-time weather updates and a 5-day forecast for any location worldwide. Utilizing cutting-edge APIs and browser geolocation features, the application seamlessly delivers precise weather information tailored to the user's current location or a manually searched city. 

### Key Features:
1. **Current Location Weather**:
   - The app automatically detects the user's location using the **Geolocation API** and displays real-time weather data, including temperature, humidity, and wind speed.
   - It ensures users always have access to accurate and relevant weather information.

2. **5-Day Forecast**:
   - In addition to real-time weather, the application provides a detailed 5-day forecast for the user's current location or a manually searched city.
   - The forecast includes daily temperature, humidity, and wind speed for better planning.

3. **City Search Functionality**:
   - Users can manually search for weather information by entering a city name.
   - The search results update the current weather and forecast for the selected city.

4. **Recent Searches**:
   - The app saves the last five searched cities using **localStorage**, allowing users to quickly revisit recent locations.

5. **Interactive UI**:
   - A dynamic dropdown menu suggests recent cities as users type, improving usability and convenience.

6. **Dynamic Weather Icons**:
   - The application visually represents weather conditions using appropriate icons for clear, cloudy, rainy, and snowy days.

7. **Accurate Data from OpenWeatherMap API**:
   - Weather information is fetched from the **OpenWeatherMap API**, ensuring reliable and up-to-date weather reports.

### Technologies Used:
- **HTML, CSS, and JavaScript**: For building a responsive and user-friendly interface.
- **Geolocation API**: To detect the user's current location.
- **OpenWeatherMap API**: For fetching real-time weather data and forecasts.
- **localStorage**: For storing recent searches.

- ### Weather Forecast Application - Setup Instructions and Usage Guide

This guide provides detailed steps to set up and use the Weather Forecast Application on your local system or a live environment.

---

### **Setup Instructions**

#### 1. **Prerequisites**
Before starting, ensure you have the following:
- A modern web browser (Google Chrome, Firefox, Edge, etc.)
- An active internet connection
- A text editor (e.g., VSCode, Sublime Text) for code modifications, if necessary
- A local server tool (optional for advanced setups, e.g., VSCode Live Server or Python’s SimpleHTTPServer)

#### 2. **Download the Source Code**
1. Clone or download the project repository:
   - Using Git:  
     ```bash
     git clone https://github.com/your-repo/weather-forecast-app.git
     ```
   - Alternatively, download the ZIP file and extract it.

2. Navigate to the project folder:
   ```bash
   cd weather-forecast-app
   ```

#### 3. **Get an OpenWeatherMap API Key**
1. Create an account on [OpenWeatherMap](https://openweathermap.org/).
2. Go to the **API Keys** section of your account.
3. Generate a new API key.
4. Replace the placeholder in the code with your API key:
   ```javascript
   const apikey = "your_api_key_here";
   ```

#### 4. **Run the Application**
You can run the application in one of the following ways:

- **Option 1: Direct File Execution**:
  - Open the `index.html` file in your browser.
  - Ensure internet connectivity for the APIs to work.

- **Option 2: Using a Local Server** (Recommended):
  - If you have VSCode, use the Live Server extension:
    - Install Live Server from the VSCode Marketplace.
    - Right-click on `index.html` and select **Open with Live Server**.
  - Alternatively, run the following command in the terminal:
    ```bash
    python -m http.server
    ```
    Access the application at `http://localhost:8000` in your browser.

---

### **Usage Instructions**

#### 1. **Accessing Current Weather and 5-Day Forecast**
- **Automatic Location Detection**:
  - When you open the application, it uses the browser's **Geolocation API** to detect your current location.
  - The app will display the current weather and 5-day forecast for your location.

#### 2. **Searching Weather by City**
- Type a city name into the input field and click the **Search** button.
- The app fetches and displays the weather data and forecast for the entered city.

#### 3. **Recent Searches**
- As you search for cities, the app saves the last five searches in the **localStorage**.
- When you type in the input field, a dropdown suggests recently searched cities.
- Click on a suggested city to update the weather display.

#### 4. **Interpreting Weather Data**
- The current weather display includes:
  - **Temperature**: Displayed in degrees Celsius.
  - **Humidity**: Shown as a percentage.
  - **Wind Speed**: Displayed in kilometers per hour (Km/h).
  - **Weather Icon**: A visual icon representing the current condition (e.g., sunny, cloudy, rainy).
- The 5-day forecast includes:
  - Daily temperature
  - Humidity
  - Wind speed
  - Date

#### 5. **Handling Location Issues**
- If your location cannot be detected, the app will prompt you to enter your city manually.
- Grant location permissions in your browser for automatic detection.

---

### **Troubleshooting**
1. **API Key Errors**:
   - Ensure the API key is correctly replaced in the code.
   - Verify the key's validity on the OpenWeatherMap account.

2. **Geolocation Issues**:
   - Allow location access in your browser.
   - Test location detection using another browser or device.

3. **Data Not Updating**:
   - Check your internet connection.
   - Open the browser console (Ctrl+Shift+J) and look for errors.

4. **Recent Searches Not Saving**:
   - Ensure your browser allows localStorage usage.
   - Clear your browser cache and try again.

---




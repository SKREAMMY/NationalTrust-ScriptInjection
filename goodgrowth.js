(async function () {

    // List of countries to decide metric type
    const countryList = ["USA", "bahamas", "the Cayman Islands", "Palau", "the Federated States of Micronesia", " Marshall Islands"].map(c => c.toLowerCase());


    // Extract latitude and longitude from the global __NEXT_DATA__ object
    const { latitude, longitude } = window.__NEXT_DATA__?.props?.pageProps?.appContext?.place?.data?.location?.latitudeLongitude || {};


    if (!latitude || !longitude) {
        console.error("Latitude and longitude are not available.");
        return;
    }

    // Weather API URL
    const weatherURL = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=${latitude}&lon=${longitude}`;

    /* 
    Function to determine the temperature unit based on the country
    * @param {number} temperature - The temperature value to format.
    * @param {boolean} iscelsius - A boolean indicating if the temperature should be displayed in Celsius.
    * @returns {string} - The formatted temperature string with the unit (°C or °F).
    */
    const formatTemperature = (temperature, isCelsius) => {
        try {
            if (!isCelsius) {
                const tempFahrenheit = ((temperature * 9) / 5 + 32).toFixed(1);
                return `${tempFahrenheit} °F`;
            }
            return `${temperature.toFixed(1)} °C`;
        } catch (error) {
            console.error("Unable to process temperature data:", error.message);
            return "Error in formatting temperature.";
        }
    };

    /*
    * Function to determine the metric type i.e., Celsius or Fahrenheit
    * @param {country} country - country to determine the metric
    * @returns {string} - Returns Celsius or Fahrenheit
    */

    const findMetricType = (country) => {
        country = country.toLowerCase();

        if (countryList.includes(country)) {
            return "Fahrenheit";
        }
        return "Celsius";
    }


    // The weather Wigdet
    const createWeatherContainer = (currentTemperature, feelsLike, description, weatherIconURL) =>
        `
                <p data-testid="place-temprature" style="display:flex; align-items: center; justify-content:left">
                    <img src="${weatherIconURL}" alt="Weather icon"/> ${currentTemperature} &nbsp;
                    <span> Feels like ${feelsLike}. ${description}</span>
                </p>
            `;

    /*
    * Function to add the weather information to the DOM
    * @param {object} weatherData - The weather d   ata object.
    */
    const addWeatherToDOM = (weatherData) => {

        const containerId = "weatherContainer";
        const existingContainer = document.getElementById(containerId);

        if (existingContainer) {
            existingContainer.remove();
        }

        // const countryName = "the Cayman Islands";
        const countryName = weatherData?.city?.country || "No Country";
        const feelsLikeTemperature = weatherData?.list[0]?.main?.feels_like || 0;
        const currentTemperature = weatherData?.list[0]?.main?.temp || 0;
        const description = weatherData?.list[0]?.weather[0]?.description || "No Description Found";
        const weatherIcon = weatherData?.list[0]?.weather[0]?.icon;
        const weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        const isCelsius = findMetricType(countryName) === "Celsius" ? true : false;

        // Creating a div container for weather
        const weatherContainer = document.createElement("div");
        weatherContainer.id = containerId;

        weatherContainer.innerHTML =
            createWeatherContainer(formatTemperature(currentTemperature, isCelsius), formatTemperature(feelsLikeTemperature, isCelsius), description, weatherIconURL);

        const addressContainer = document.querySelector('[data-testid="place-postal-address"]');

        if (addressContainer) {
            addressContainer.insertAdjacentElement("afterend", weatherContainer);
        } else {
            console.error("Address container not found in the DOM.");
        }
    };


    /*
    * Function to fetch weather data
    * @param {string} url - The URL to fetch weather data from.
    * @returns {object|null} - The fetched weather data or null in case of an error.
    */
    const fetchWeatherData = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log("Weather data response:", data);
                return data;
            }
            else {
                throw new Error(`Error in fetching weather data ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };


    // Fetch weather data and add it to the DOM
    const weatherData = await fetchWeatherData(weatherURL);
    if (weatherData) {
        addWeatherToDOM(weatherData);
    }


})();

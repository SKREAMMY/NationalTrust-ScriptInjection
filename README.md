To run this script.

1. Navigate to this [URL](https://www.nationaltrust.org.uk/visit/warwickshire/upton-house-and-gardens)

2. Open dev console using **_Ctrl + Shift + I_** for Windows or **_Cmd + Shift + I_** for Mac.

3. ***Open the console tab, copy and run the script.***


>Overview of the solution.

# OBJECTIVE: 

_To create a script that dynamically fetches and displays weather information based on the property's location on a webpage._

## Key Features!

### Dynamic Temperature Format:

_Automatically detects the country and displays the temperature in Celsius or Fahrenheit based on the region._


### Weather Details:

Displays:
- Current temperature
- Feels-like temperature
- A weather description
- An icon representing the weather condition.


### Efficient Integration:

_Replaces any existing weather widget to prevent duplication._

---

## Functions Used!


### fetchWeatherData(url):

_Fetches weather data from the API._  
- **Parameters**:  
  `url` - The URL to fetch weather data from.  
- **Returns**:  
  The fetched weather data object or `null` if an error occurs.


### createWeatherContainer(currentTemperature, feelsLike, description, weatherIconURL):

_Creates a weather widget containing the temperature, description, and weather icon._  
- **Parameters**:  
  `currentTemperature` - The formatted current temperature.  
  `feelsLike` - The formatted feels-like temperature.  
  `description` - A brief description of the weather.  
  `weatherIconURL` - The URL for the weather icon.  
- **Returns**:  
  A string containing the HTML for the widget.


### addWeatherToDOM(weatherData):

_Adds the weather widget to the page._  
- **Parameters**:  
  `weatherData` - The object containing weather information.  
- **Details**:  
  Inserts the widget near the address section and ensures no duplicates exist.


### findMetricType(country):

_Determines whether the temperature should be displayed in Celsius or Fahrenheit._  
- **Parameters**:  
  `country` - The name of the country.  
- **Returns**:  
  `"Celsius"` or `"Fahrenheit"` based on the country.


### formatTemperature(temperature, isCelsius):

_Formats the temperature based on the detected unit._  
- **Parameters**:  
  `temperature` - The numeric temperature to format.  
  `isCelsius` - A boolean indicating whether to use Celsius.  
- **Returns**:  
  A string containing the formatted temperature and unit.
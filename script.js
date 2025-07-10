const apiKey = "c381d2483b3f6c239757a0f3611cf23c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");


async function displayWeather(city) {
    if(city === "") {
        alert("Please enter a city name");
        return;
    }
    const url = apiUrl + city + "&appid=" + apiKey;
    const response = await fetch(url);
    if(response.status === 404) {
        // alert("City not found!");
        document.querySelector(".error").style.display = "block";
    document.querySelector(".display").style.display = "none";
    }else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".tempetature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity-t").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-t").innerHTML = data.wind.speed + "km/s";

        if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "imsges/clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "imsges/rain.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "imsges/clear.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "imsges/snow.png";
        }else if (data.weather[0].main === "drizzle") {
            weatherIcon.src = "imsges/drizzle.png";
        } else {
            weatherIcon.src = "imsges/mist.png";
        }


        document.querySelector(".display").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value;
    displayWeather(city);
});
searchInput.addEventListener("keypress", (e) =>{
    if(e.key === "Enter"){
        const city = searchInput.value;
        e.preventDefault();  
        displayWeather(city);
    }
});
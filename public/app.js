let weather = {   
   "apikey": "process.env.API_KEY_VALUE",   
   fetchWeather: function(city) {

      const url = `/api?q=${city}`
      fetch(
         url
      )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
   },
   displayWeather: function(data) {   
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;      
      document.querySelector(".city").innerHTML = "Weather in" + "  " + name;
      document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerHTML = description;
      document.querySelector(".temp").innerHTML = (Math.round((temp - 273.15)) + "°C");
      document.querySelector(".humidity").innerHTML = "Humidity:" + humidity + "%";
      document.querySelector(".wind").innerHTML = "Wind speed:" + speed + "km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + "')"
   },
   search: function() {
      this.fetchWeather(document.querySelector(".search-bar").value);
   }
}

document.querySelector(".search button").addEventListener('click', () => {
   weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
   if(event.key == "Enter"){
      weather.search();
   }
})      

weather.fetchWeather("Nairobi");
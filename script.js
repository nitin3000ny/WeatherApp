const Api_Key='cbf695abb50ee416c866639a15088437';
const Button= document.querySelector('#check');
Button.addEventListener('click',()=>{const city_name = document.getElementById('city_name').value.trim();

    getgeo(Api_Key,city_name);
    
})
 async function getgeo(Api_Key,city_name){
const geoUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${Api_Key}`;
const data=await fetch(geoUrl);
const GeoData=await data.json();
lat = GeoData[0].lat;
lon=GeoData[0].lon;
fetchWeather(lat,lon);
 }
 async function  fetchWeather(lati,long){
const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${Api_Key}&units=metric`;
const getData=await fetch(weatherUrl);
const dataBack=await getData.json();
console.log(dataBack);
const icon =dataBack.weather[0].icon;
const temp=dataBack.main.temp;
const feelsLike=dataBack.main.feels_like;
const minTemp=dataBack.main.temp_min;
const maxTemp=dataBack.main.temp_max;
const currentWeather=dataBack.weather[0].main;
const desc=dataBack.weather[0].decription;
const imag=document.querySelector('#weather-conditions');
imag.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
// main: {temp: 24.54, feels_like: 24.46, temp_min: 20.89, temp_max: 27.22, pressure: 1018, …}
// DisplayWeather()
 }
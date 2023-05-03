// import { locService } from "./loc.service"

export const weatherService = {
    getWeather
}

function getWeather(lat, lan) {
    const W_KEY = '814987949ae19d5273834831df5f13a6'
    
    return axios.get(` http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&APPID=${W_KEY}&units=metric `)
        .then(res => res.data)
        .then(data => ({
            country: data.sys.country,
            city: data.name,
            desciption: data.weather[0].description,
            temp: data.main.temp,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            wind: data.wind.speed
        }))
}
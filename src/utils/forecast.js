const chalk = require('chalk');
const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=256c542d09a859c85ee69dc453a03bfa&query='+latitude+','+longitude

    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect Whether Service',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0]+', It is currently '
            +response.body.current.temperature+' degree Celsius and it feel like '+response.body.current.feelslike
            + ' degree Celsius. And the chance of rain is: '+response.body.current.precip+'%. '+'Coordinates are, Latitude: '+response.body.location.lat+
            ', Longitude: '+response.body.location.lon)
                
            
        }
    })
}
module.exports= forecast
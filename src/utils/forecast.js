const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=1c39b52537cd151f7c8daba30a8217ff&query='+latitude+','+longitude
    request({url: url, json: true},(error,response) =>{
        if(error){
            callback("You are not connected to the internet",undefined)
        }
        else if(response.body.error){
            callback("please enter the valid location",undefined)
        }
        else{
            callback(undefined,{
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike})
        }
    })
}

module.exports = forecast
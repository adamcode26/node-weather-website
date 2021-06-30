const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { error } = require('console')


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:"Weather App",
        name:"Ayush Singh"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:"About Me",
        name:"Ayush Singh"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Ayush Singh"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please the address. It's mandatory!"
        })
    }
    geocode(req.query.address,(error,data) =>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(data.latitude, data.longitude, (error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            return res.send({
                location: data.location,
                forecast: forecastData
                /*temperature: forecastData.temperature,
                appearent: forecastData.feelslike*/
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:"Help article for this query not found!",
        title: "Error404",
        name: "Ayush Singh"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:"Page not found",
        title: "Error404",
        name: "Ayush Singh"
    })
})

app.listen('3000',()=> {
    console.log("App is running")
})
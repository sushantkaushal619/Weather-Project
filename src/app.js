const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')
const chalk = require('chalk');

const app=express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partial')

//setup handler engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
console.log("for git")
app.get('', (req, res) => {
    res.render('index',
    {
        title: 'Weather',
        name: 'Sushant Kaushal'

    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sushant Kaushal'
 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Sushant Kaushal'
     })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({
        error:'Please enter the address'
    })
    const address=req.query.address
    const lati=''
    const long=''
    geoCode(address,(error,data)=>
    {
        if(error)
        {
            return res.send({
                error: 'Please enter a valid address'
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
            return res.send({
                error: 'Some Error occured in forecast code'
            })
            }
            res.send({
                location:data.location,
                forecast:forecastData,
                address:req.query.address
            })

        })
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sushant Kaushal',
        errorMessage:'Help article not found'

    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sushant Kaushal',
        errorMessage:'Page not found'

    })
})
app.listen(3000,()=>{

    console.log("Listining on port 3000");
    
})
require('dotenv').config()
const express = require('express')
const app = express()
const SampleDataController = require('./controllers/SampledDataController')

app.use((req,resp,next)=>{
	resp.set("Access-Control-Allow-Origin","*")
	resp.set('Access-Control-Allow-Methods','GET,POST')
	resp.set('Access-Control-Allow-Headers','Origin, X-Requested-With,Accept,Authorization,Content-Type,charset,x-access-token')
	next();
})

app.get('/', async (req,res)=>{
    const { category } = req.query
    if (!category){
        const data = await SampleDataController.get()
        return res.json({ok:true, data})    
    }
    const data = await SampleDataController.getByCategory(parseInt(category,10))
    res.json({ok:true, data})
})


app.listen(process.env.PORT || 4000, ()=>{
    console.log('Online')
})


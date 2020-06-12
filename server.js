const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('ApI running...')
})

app.listen(PORT,()=>{
    console.log(`Server Started at Pot ${PORT}`)
})
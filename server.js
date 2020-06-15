const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('ApI running...')
})
//initalize middleware
//app.use(bodyParser.json())
app.use(express.json({extended : false}))
//define routers
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))

app.use('/api/users',require('./routes/api/users'))
app.listen(PORT,()=>{
    console.log(`Server Started at Pot ${PORT}`)
})
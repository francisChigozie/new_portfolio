const express = require('express')
const bodyParser = require('body-parser')
//const hbs = require('express-handlebars')
const dotenv = require('dotenv')
const connectToDatabase = require('./models/index');
const path = require('path')
const colors = require('colors')
const router = require("./routes/routes")
const cors = require('cors')
const morgan = require('morgan')
const mongoSaitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const sendmail = require('./routes/sendmail')
//const books = require('./routes/books');
//const contacts = require('./routes/contacts');
//const hotelcontact = require('./routes/hotelcontact');
const errorHadler = require('./middleware/error');

// Load env vars
dotenv.config({path:'./config/config.env'})

const app = express()

app.use(express.json())

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
     app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.use(cors({
    origin: "https://frankfurtfintek.netlify.app/" //or your netlify domain
}))

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, `public`)))
//app.use(express.static(process.cwd() + 'public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//Sanitize Data
app.use(mongoSaitize())

//Set security
app.use(helmet())

//Prevent XSS attacks
app.use(xss())

//Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,  // 10 mins
    max: 100 
}) 
app.use(limiter)

//Prevent http param pollution
app.use(hpp())

app.use('/', router)
//app.use('/api/v1/contacts'contacts)
//app.use('/api/v1/hotelcontact', hotelcontact)
app.use(errorHadler)    

//CONNECTINT TO DATA BASE
 connectToDatabase( {
             useNewUrlParser: true, useUnifiedTopoology: true 
        })
 .then((error) => {
    if (error) {
        console.log(error)
        return process.exit(1)
    }
    app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});

});
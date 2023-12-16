const express =require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash=require('connect-flash');
const passport=require('passport');


//Inicialiations

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const app= express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');

//Middlewares

app.unsubscribe(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





//Global Variables
app.use((req,res,next) =>{
    res.locals.success_msg= req.flash('success_msg');  
    res.locals.error_msg= req.flash('error_msg'); 
    res.locals.error = req.flash('error'); 
    res.locals.user= req.user || null;
    next();
});
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is Listenninng
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});
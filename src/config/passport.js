const passport= require('passport');
const localStrategy = require('passport-local').Strategy;

const User=require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
},  async (email,password,done)=>{
    try {
    const user = await User.findOne({email:email});
    if(!user){
        return done(null,false,{message:'No se encontro usuario.'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false,{message:'Contraseña Incorrecta'});
        }
    }
    }catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
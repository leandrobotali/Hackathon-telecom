const UsersCtrl = {};

const passport = require('passport')

const User = require('../models/user')

UsersCtrl.renderSignUpForm = (req,res)=>{
    res.render('users/signup')
}

UsersCtrl.signUp = async (req,res)=>{
    const errors =[]
    const{name, email,password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords no coinciden'})
    }
    if(password.length < 4){
        errors.push({text: 'Password muy corta'})
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email
        })
    } else{
        const emailUser =await User.findOne({email:email}).lean()
        if(emailUser){
            req.flash('error_msg', 'El correo ya esta en uso')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({name,email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'Estas registrado')
            res.redirect('/users/signin')
        }
    }
}

UsersCtrl.renderSignInForm = (req,res)=>{
    res.render('users/signin')
}

UsersCtrl.signIn = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect:'/notes',
    failureFlash:true
});

UsersCtrl.logOut = (req,res)=>{
    req.logOut();
    req.flash('success_msg', 'Se cerro tu session');
    res.redirect('/users/signin')
}


module.exports = UsersCtrl
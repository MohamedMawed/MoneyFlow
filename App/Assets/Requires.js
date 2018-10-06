
let icons = ()=>{
let ddd=[]

    for (i = 0; i < 25; i++) {
        ddd.push(require('./img/Icon/money-bag.png') )
    } 
    return ddd
}

export const Requires = {
    Logo_main: require('./img/logo-main.png'),
    toturil: [require('./img/toturil1.png'), require('./img/toturil2.png'), require('./img/toturil3.png')],
    Email: require('./img/at_email.png'),
    Logo: require('./img/logo.png'),
    Password: require('./img/password.png'),
    FB: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    User: require('./img/user.png'),
    ICons:icons(),
    User: require('./img/user.png'),
    claender: require('./img/claender.png'),
    edit: require('./img/edit.png'),
    remove: require('./img/remove.png'),
    back: require('./img/arrow-back.png'),
    
}



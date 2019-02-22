import { strings } from '../locals';


export const extraIcons = () => {
    let ddd = [
        { icon: require('./img/Icon/extra/001-smartphone.png'), text: 'smartphone' },
        { icon: require('./img/Icon/extra/002-book.png'), text: 'book' },
        { icon: require('./img/Icon/extra/003-bulb.png'), text: 'bulb' },
        { icon: require('./img/Icon/extra/004-supermarket.png'), text: 'supermarket' },
        { icon: require('./img/Icon/extra/005-shield.png'), text: 'shield' },
        { icon: require('./img/Icon/extra/006-team.png'), text: 'team' },
        { icon: require('./img/Icon/extra/007-shout.png'), text: 'shout' },
        { icon: require('./img/Icon/extra/008-heart.png'), text: 'heart' },
        { icon: require('./img/Icon/extra/009-food.png'), text: 'food' },
        { icon: require('./img/Icon/extra/010-avatar.png'), text: 'avatar' },
        { icon: require('./img/Icon/extra/011-house.png'), text: 'house' },
        { icon: require('./img/Icon/extra/012-teacher.png'), text: 'teacher' },
        { icon: require('./img/Icon/extra/013-phone.png'), text: 'phone' },
        { icon: require('./img/Icon/extra/014-list.png'), text: 'list' },
        { icon: require('./img/Icon/extra/015-joystick.png'), text: 'joystick' },
        { icon: require('./img/Icon/extra/016-money.png'), text: 'money' },
        { icon: require('./img/Icon/extra/017-camera.png'), text: 'camera' },
        { icon: require('./img/Icon/extra/018-contract.png'), text: 'contract' },
        { icon: require('./img/Icon/extra/019-cinema.png'), text: 'cinema' },
        { icon: require('./img/Icon/extra/020-game-controller.png'), text: 'game-controller' },
        { icon: require('./img/Icon/extra/021-departures.png'), text: 'departures' },
        { icon: require('./img/Icon/extra/022-credit-card.png'), text: 'credit-card' },
        { icon: require('./img/Icon/extra/023-cake.png'), text: 'cake' },
        { icon: require('./img/Icon/extra/024-gift.png'), text: 'gift' },



    ]
    return ddd
}




export const icons = () => {
    let ddd = [
        { icon: require('./img/Icon/bank.png'), text: 'bank' },
        { icon: require('./img/Icon/bicycle.png'), text: 'bicycle' },
        { icon: require('./img/Icon/car.png'), text: 'car' },
        { icon: require('./img/Icon/credit-card.png'), text: 'credit card' },
        { icon: require('./img/Icon/debt.png'), text: 'debt' },
        { icon: require('./img/Icon/deposit.png'), text: 'deposit' },
        { icon: require('./img/Icon/gamepad.png'), text: 'gamepad' },
        { icon: require('./img/Icon/gold-ingots.png'), text: 'gold ingots' },
        { icon: require('./img/Icon/insurance.png'), text: 'insurance' },
        { icon: require('./img/Icon/laptop.png'), text: 'laptop' },
        { icon: require('./img/Icon/library.png'), text: 'library' },
        { icon: require('./img/Icon/online-course.png'), text: 'online course' },
        { icon: require('./img/Icon/photo-camera.png'), text: 'photo camera' },
        { icon: require('./img/Icon/piggy-bank.png'), text: 'piggy bank' },
        { icon: require('./img/Icon/presentation.png'), text: 'presentation' },
        { icon: require('./img/Icon/profit.png'), text: 'profit' },
        { icon: require('./img/Icon/scholarship.png'), text: 'scholarship' },
        { icon: require('./img/Icon/shirt.png'), text: 'shirt' },
        { icon: require('./img/Icon/shopping-bag.png'), text: 'shopping bag' },
        { icon: require('./img/Icon/sneakers.png'), text: 'sneakers' },
        { icon: require('./img/Icon/sunglasses.png'), text: 'sunglasses' },
        { icon: require('./img/Icon/vespa.png'), text: 'vespa' },
        { icon: require('./img/Icon/wallet.png'), text: 'wallet' },
        { icon: require('./img/Icon/world.png'), text: 'world' }
    ]
    return ddd
}



export const iconsBudgetList = () => {
    let ddd = [
       { icon: require('./img/incomeAndExpences/Bills.png'), text:strings('Bills')  },
        {  icon: require('./img/incomeAndExpences/Groceries.png'), text:strings('Groceries')  },
        { icon: require('./img/incomeAndExpences/Transportation.png'), text:strings('Transportation')   },
        {  icon: require('./img/incomeAndExpences/shopping.png'), text:strings('Shopping')   },
        { icon: require('./img/incomeAndExpences/Education.png'), text:strings('Education')   },
        {  icon: require('./img/incomeAndExpences/Health.png'), text:strings('HealthFitness')   },
        {  icon: require('./img/incomeAndExpences/Entertainment.png'), text:strings('Entertainment')},
        {  icon: require('./img/incomeAndExpences/Gifts.png'), text: strings('GiftsDonations') },
        {  icon: require('./img/incomeAndExpences/Business.png'), text: strings('Business')  }

    ]
    return ddd
}





export const incomeCategory= () =>
    [
        [{ id: 1, icon: require('./img/incomeAndExpences/Salary.png'), text:strings('Salary')  },
        { id: 2, icon: require('./img/incomeAndExpences/Business.png'), text: strings('Business') }],
        [{ id: 1, icon: require('./img/incomeAndExpences/Bills.png'), text: strings('Bills') },
        { id: 2, icon: require('./img/incomeAndExpences/Groceries.png'), text: strings('Groceries')  },
        { id: 3, icon: require('./img/incomeAndExpences/Transportation.png'), text: strings('Transportation') },
        { id: 4, icon: require('./img/incomeAndExpences/shopping.png'), text: strings('Shopping') },
        { id: 5, icon: require('./img/incomeAndExpences/Education.png'), text: strings('Education')  },
        { id: 6, icon: require('./img/incomeAndExpences/Health.png'), text: strings('HealthFitness') },
        { id: 7, icon: require('./img/incomeAndExpences/Entertainment.png'), text: strings('Entertainment')},
        { id: 8, icon: require('./img/incomeAndExpences/Gifts.png'), text: strings('GiftsDonations') },
        { id: 9, icon: require('./img/incomeAndExpences/Business.png'), text: strings('Business') }
        ]]
export const Requires = {
    PlusAdd: require('./img/plusAdd.png'),
    goalIcon: require('./img/goalIcon.png'),
    budgetIcon: require('./img/budgetIcon.png'),
    Logo_main: require('./img/logo-main.png'),
    toturil: [require('./img/toturil1.png'), require('./img/toturil2.png'), require('./img/toturil3.png')],
    Email: require('./img/at_email.png'),
    Logo: require('./img/logo.png'),
    Password: require('./img/password.png'),
    FB: require('./img/facebook.png'),
    Google: require('./img/google.png'),
    User: require('./img/user.png'),
    ICons: icons(),
    extraIcons:extraIcons(),
    refresh: require('./img/refresh.png'),
    User: require('./img/user.png'),
    claender: require('./img/claender.png'),
    edit: require('./img/edit.png'),
    remove: require('./img/remove.png'),
    back: require('./img/arrow-back.png'),
    arrow_left: require('./img/arrow-left.png'),
    arrow_up: require('./img/arrowup.png'),
    arrow_down: require('./img/arrowdown.png'),
    arrow_right: require('./img/arrow-right.png'),
    arrow_dropdown: require('./img/chavron-down.png'),
    Home: require('./img/home.png'),
    Plan: require('./img/plane.png'),
    Plus: require('./img/plus.png'),
    iconsBudgetList:iconsBudgetList(),
    Report: require('./img/mezaneya.png'),
    Setting: require('./img/settings.png'),
    car2: require('./img/car2.png'),
    exportLogo: require('./img/export-large.png'),
    settings_large: require('./img/settings-large.png'),
    America: require('./img/united-states.png'),
    Egypt: require('./img/egypt.png'),
    money2: require('./img/money2.png'),
    money1: require('./img/money1.png'),
    arrow_down2: require('./img/play-button.png'),
    addIncomeLogo: require('./img/addIncomeLogo.png'),
    noMoney: require('./img/noMoney.png'),
    // appointmentStart:require('./img/appointmentStart.PNG'),
    appointment: require('./img/appointment.png'),

    noMoney2: require('./img/noMoney2.png'),
    dots: require('./img/dots.png'),
}
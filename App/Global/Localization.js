export const Language = 'en'
export const LanguageAlignment = () => {
    if (Language == 'ar')
        return 'right'
    return 'left'
}
export const FixViewsOrder = () => {
    if (Language == 'ar')
        return 'row'
    return 'row-reverse'
}
const Ar_Lang = {
    TitleIntroScreen: ['تتبع نفقاتك ودخلك','حدد ميزانيتك الشهرية','حدد أهدافك المالية'],
    ContentIntroScreen:['سنساعدك على معرفة أين يذهب مالك وكيف تحافظ على دخلك','تحديد ميزانية شهرية سيساعدك كثيرا على التوفير لادخار المزيد من المال',
    'هل تخطط لشراء شىء ؟ \n تستطيع تحديد هدف شراء منزل مثلا بموعد محدد وتتبع التقدم'],
    Register:'تسجيل حساب',
    Login:'دخول',
    Next:'التالى',
    ChooseIcon:'اختر أيقونة معبرة'

}
const En_Lang = {
    TitleIntroScreen: [
        'Track your expenses and incomes',
        'Set your budgets',
        'Add your financial goals'],
    ContentIntroScreen:[
        'This app helps you to know where your money goes to save it.',
        'Save more by setting budgets.',
        'Need to buy something. Add a goal for it.'],
    Register:'Register',
    Login:'Login',
    Next:'Next',
    ChooseIcon:'Choose Descriptive Icon'
}
export const Lang = (txt) => {
    if (Language == 'ar')
        return Ar_Lang[txt]
    else
        return En_Lang[txt]
}
export const Language = 'eng'
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
    HeaderLogin: 'صفحة تسجيل الدخول',
    HeaderForgetPassword: 'نسيت كلمة السر',
    HeaderNewPassword: 'ضبط كلمة المرور الجديدة',
    UserNamePlaceHolder: 'اسم المستخدم',
    PasswordPlaceHolder: ' كلمة السر الجديدة',
    NewPasswordPlaceHolder: 'كلمة السر',
    LoginButton: 'تسجيل الدخول',
    SendForgetMessageButton: 'ارسال',
    AuthanticationNumber: 'رمز التعريف والتحقق',
    CodeNotRecieved: 'لم اتلقي الرمز',
    ResendCode: 'أعد الارسال',
    AuthNumberSureButton: 'تأكيد',
    AuthNumberHelperText: 'لأسباب امنية , نحتاج إلي الرمز الذي ارسله إليك عن طريق الرسائل القصيرة',
    AppHomeScreenSwiperData: ['الأطفال', 'الأخري', 'الاشعارات'],
    ContactUs: 'اتصل بنا',
    ContactUsHelperText: 'اكتب رسالتك وسوف نتصل بك قريبا',
    ContactUsWriteMessagePlaceHolder: 'اكتب رسالتك',
    ContactUsSendButton: 'ارسل',
    OthersTabLangButton: 'اللغة',
    OthersTabContactUsButton: 'اتصل بنا',
    OthersTabAboutUsButton: 'عن التطبيق',
    OthersTabLogoutButton: 'تسجيل الخروج',
    BoyAppHomeScreenSwiperData: ['النشاط', 'اليوم', 'السلوك'],
    BoyAppActivityTabTimeTable: 'الجدول الزمني',
    BoyAppActivityTabAsignment: 'الواجب',
    BoyAppActivityTabCourses: 'المنهج الدراسي',
    BoyAppActivityTabReports: 'بلاغات',
    BoyAppActivityTabGallary: 'معرض الصور',
    DetailedAtitudeDotGraphHeader: 'تقييم شهري',
    DetailedAtitudePieGraphHeader: 'الحضور',
    Total: 'اجمالي',
    Days: 'أيام',
    Absence: 'الغياب',
    FinalDeadLine: 'الموعد النهائي',
    AtitudeDetailsHeader: 'تفاصيل السلوك',
    ChangeTime: 'تغيير الوقت',
    WeekWord: 'الأسبوع',
    SureWord: 'تأكيد',
    MonthWord: 'الشهر',
    Months: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمير', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    Weeks: ['الأول', 'الثاني', 'الثالث', 'الرابع'],
    SearchWord: 'البحث'
}
const En_Lang = {
    HeaderLogin: 'Login',
    HeaderForgetPassword: 'Forget Password',
    HeaderNewPassword: 'Update Password',
    UserNamePlaceHolder: 'User Name',
    NewPasswordPlaceHolder: 'New Password',
    LoginButton: 'Login',
    SendForgetMessageButton: 'Send',
    AuthanticationNumber: 'Authantication Number',
    CodeNotRecieved: `Don't Recieve Code`,
    ResendCode: 'Resend Code',
    AuthNumberSureButton: 'Sure',
    AuthNumberHelperText: 'for security resons , we need the code that is sent to you through SMS',
    AppHomeScreenSwiperData: ['Childerns', 'Others', 'Notifications'],
    ContactUs: 'Contact Us',
    ContactUsHelperText: 'Please, leave your message and we will contact you soon',
    ContactUsWriteMessagePlaceHolder: 'Write a message',
    ContactUsSendButton: 'send',
    OthersTabLangButton: 'Language',
    OthersTabContactUsButton: 'Contact Us',
    OthersTabAboutUsButton: 'About Us',
    BoyAppHomeScreenSwiperData: ['Activity', 'Today', 'Atitude'],
    OthersTabLogoutButton: 'Logout',
    BoyAppActivityTabTimeTable: 'Time Table',
    BoyAppActivityTabAsignment: 'Assigments',
    BoyAppActivityTabCourses: 'Courses',
    BoyAppActivityTabReports: 'Reports',
    BoyAppActivityTabGallary: 'Gallary',
    DetailedAtitudeDotGraphHeader: 'Monthly Evalution',
    DetailedAtitudePieGraphHeader: 'Attendance',
    Total: 'Total',
    Days: 'days',
    Absence: 'Absence',
    FinalDeadLine: 'Final Deadline',
    AtitudeDetailsHeader: 'Atitude Details',
    MonthWord: 'Month',
    WeekWord: 'Week',
    ChangeTime: 'Change Time',
    SureWord: 'Sure',
    Months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    Weeks: ['First', 'Second', 'Third', 'Fourth'],
    SearchWord: 'Search'

}
export const Lang = (txt) => {
    if (Language == 'ar')
        return Ar_Lang[txt]
    else
        return En_Lang[txt]
}
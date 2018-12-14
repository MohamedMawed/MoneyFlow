import ReactNative,{View} from 'react-native';
import I18n from 'react-native-i18n';
import React from 'react';

// Import all locales
import en from './en';
import ar from './ar';
import RNRestart from 'react-native-restart';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'


export const RenderBackButton=({color="#fff"})=>{
    if(getAppLanguage()=="ar"){
        return (
            <Ionicons name={"md-arrow-forward"} color={color} size={22}/>
        )   
    }

    return (
        <Ionicons name={"md-arrow-back"} color={color} size={22}/>
    )
}

export const RenderForwardButton=({color="#fff"})=>{
    if(getAppLanguage()!=="ar"){
        return (
            <Ionicons name={"md-arrow-forward"} color={color} size={22}/>
        )   
    }
    return (
        <Ionicons name={"md-arrow-back"} color={color} size={22}/>
    )
}

export const RenderRightButton=({color="#fff"})=>{
    if(getAppLanguage()!=="ar"){
        return (
            <Entypo name={"chevron-right"} color={color} size={22}/>
        )   
    }
    return (
        <Entypo name={"chevron-left"} color={color} size={22}/>
    )
}


// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    en,
    ar
};

// Is it a RTL language?
export const isRTL = function () {
    const currentLocale = I18n.currentLocale();
    return currentLocale === "ar";
}

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(false);

let AppLanguage = "en"
export const getAppLanguage = () => {
    return AppLanguage
}
export const setAppLanguage = async (lang,restart=true) => {
    console.log("TAG","setapplang",lang)
    let ch = AppLanguage == lang;
    AppLanguage = lang
    if (lang == "ar") {
        ReactNative.I18nManager.forceRTL(true);
    } else {
        ReactNative.I18nManager.forceRTL(false);
    }
    await ReactNative.AsyncStorage.setItem('language', lang)
    if(ch && restart){
        RNRestart.Restart();
    }
   
}
// The method we'll use instead of a regular string
export function strings(name, params = {}) {
    params = { locale: AppLanguage }
    return I18n.t(name, params);
};

// setAppLanguage('ar',true);


export default I18n;
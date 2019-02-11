import { Width } from './Dimension'
export const FontSize = {
    smallFontSize: Width * .04,
    smallFontSize1: Width * .03,
    MediumFontSize : Width * .035,
    smallFontSize2: Width * .025,
    LargFontSize: Width * .04,
    VeryLargFontSize: Width * .07,
}
export var FontFamilies = {
    // Etisalat_0: 'GE SS Two Etisalat_0',
    Etisalat_0: 'GE SS Two Etisalat_0',
}

// export var FontFamilies 

export const setFont =async (x)=>{
FontFamilies = {Etisalat_0: x}

}






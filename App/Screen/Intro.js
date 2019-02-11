import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { NavigationActions, StackActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Requires } from '../Assets/Requires';
import { FontFamilies } from '../Global/Font';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { strings, getAppLanguage } from '../locals';

class Intro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GradientBackground: [[Colors.greenlite, Colors.GreenColor], ['#8D8DE0', '#6266DA'], ['#FA4B5B', '#EF858D']],
            StepColor: [Colors.GreenColor, '#6266DA', '#E8787E'],
            index: 0
        }
    }
    
    _renderItem({ item, index }, parallaxProps) {
        let { GradientBackground } = this.state
        return (
            <View style={Styles.ParentItem}>
                <View style={[Styles.contentItem, { overflow: 'hidden' }]}>
                    <LinearGradient
                        colors={GradientBackground[index]}
                        style={{
                            width: Width * 1.3,
                            height: Width * 1.3,
                            backgroundColor: Colors.BlueColor,
                            borderRadius: Width * .7,
                            position: 'absolute',
                            top: -Width * .6,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Image resizeMode="contain" source={Requires.toturil[index]} style={{ width: '30%', height: '30%', position: 'absolute', bottom: Height * .1 }} />
                    </LinearGradient>
                    <View style={{ width: '85%', alignItems: 'center', marginTop: Height * .47 }}>
                        <Text style={[Styles.TextStyle, { fontSize: Width*.045, fontFamily: FontFamilies.Etisalat_0 }]}>{strings('TitleIntroScreen')[index]}</Text>
                        <Text style={[Styles.TextStyle, { textAlign: 'center', fontSize: Width*.035, color: Colors.DarkGrayColor, marginTop: Height * .02, lineHeight: Height * .032 , fontFamily: FontFamilies.Etisalat_0}]}>{strings('ContentIntroScreen')[index]}</Text>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        let { navigate } = this.props.navigation
        let { GradientBackground, StepColor } = this.state

        return (<View style={Styles.Container}>


            <View style={Styles.ParentCarousel}>
                <Carousel

                    onSnapToItem={(index) => {
                        this.setState({ index: index })
                    }}
                    inactiveSlideShift={1}
                    ref={(c) => { this._carousel = c; }}
                    data={[1, 2, 2]}
                    renderItem={(RES) => this._renderItem(RES)}
                    sliderWidth={Width}
                    itemWidth={Width}
                    style={Styles.Carousel}
                />
            </View>
            {this.state.index == 2 ?
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}>

                    <TouchableOpacity onPress={() => {
                     AsyncStorage.setItem('FirstTime','true');

                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}

                        style={[Styles.Button, { overflow: 'hidden', width: '48%', backgroundColor: StepColor[this.state.index] }]} >

                        <Text style={[Styles.TextStyle, { color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }]}>{strings('Login')}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      AsyncStorage.setItem('FirstTime','true');

                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Register' })],
                        });
                        this.props.navigation.dispatch(resetAction);

                    }}

                        style={[Styles.Button, { overflow: 'hidden', width: '48%', backgroundColor: StepColor[this.state.index] }]} >
                        <Text style={[Styles.TextStyle, { color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }]}>{strings('Register')}</Text>
                    </TouchableOpacity>
                </View>

                :
                <TouchableOpacity onPress={() => {
                    this.setState({ index: this.state.index + 1 })
                    this._carousel.snapToNext();
                }} style={[Styles.Button, { overflow: 'hidden', backgroundColor: StepColor[this.state.index] }]} >
                    <Text style={[Styles.TextStyle, { color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }]}>{strings('Next')}</Text>
                </TouchableOpacity>}




            <View style={{ width: '40%', height: '20%', flexDirection: 'row', justifyContent: 'space-between', marginTop: Height * .7, position: 'absolute' }}>
                <View style={{ width: Width * .12, height: Height * .015, backgroundColor: this.state.index >= 0 ? this.state.StepColor[this.state.index] : Colors.MediumGrayColor, borderRadius: Width * .03 }} />
                <View style={{ width: Width * .12, height: Height * .015, backgroundColor: this.state.index >= 1 ? this.state.StepColor[this.state.index] : Colors.MediumGrayColor, borderRadius: Width * .03 }} />
                <View style={{ width: Width * .12, height: Height * .015, backgroundColor: this.state.index >= 2 ? this.state.StepColor[this.state.index] : Colors.MediumGrayColor, borderRadius: Width * .03 }} />
            </View>


        </View>
        )
    }
    async componentDidMount() {
        await AsyncStorage.setItem('Income','0');
        await AsyncStorage.setItem('Expenses','0');
        if(getAppLanguage() == 'ar'){
            let temp = this.state.GradientBackground;
            temp.reverse();
            this.setState({GradientBackground:temp})
        }
    }
}
const Styles = StyleSheet.create({
    Container: { width: Width, height: Height, alignItems: 'center', backgroundColor: Colors.ofWhiteColr },
    ContentSwiper: { width: '90%', height: '100%', backgroundColor: 'red' },
    Button: {
        width: '90%', height: '7%', backgroundColor: Colors.GreenColors0, borderRadius: Width * .1, marginTop: Height * .03, alignItems: 'center', justifyContent: 'center'
    },
    ParentCarousel: {
        width: Width, height: '80%', alignItems: 'center', marginTop: Height * .03
    },
    Carousel: { width: '100%', alignItems: 'center', opacity: 1 },
    ParentItem: {
        width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
    },
    contentItem: {
        width: '90%', height: '95%', alignItems: 'center', backgroundColor: Colors.WhiteColor, borderRadius: Width * .03, elevation: 5
    },
    TextStyle: {
        fontFamily: FontFamilies.Etisalat_0,
        color: Colors.BlackColor,
        textAlign: 'center',
        fontSize: 18
    }


})
export { Intro } 
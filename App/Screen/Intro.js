import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { FontsApp } from '../Assets/Fonts/Font';
import Swiper from 'react-native-swiper';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Requires } from '../Assets/Requires';

class Intro extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    _renderItem({ item, index }, parallaxProps) {
        return (
            <View style={Styles.ParentItem}>
                <View style={[Styles.contentItem, { overflow: 'hidden' }]}>
                    <LinearGradient colors={[Colors.greenlite, Colors.GreenColor]} style={{ width: Width * 1.3, height: Width * 1.3, backgroundColor: Colors.BlueColor, borderRadius: Width * .7, position: 'absolute', top: -Width * .6,alignItems:'center',justifyContent:'center' }}>
                    <Image resizeMode="contain" source={Requires.toturil1} style={{ width: '30%', height: '30%',position:'absolute',bottom:Height*.1 }} />
                    </LinearGradient>
                </View>
            </View>
        );
    }
    render() {
        return (<View style={Styles.Container}>


            <View style={Styles.ParentCarousel}>
                <Carousel
                    inactiveSlideShift={1}
                    ref={(c) => { this._carousel = c; }}
                    data={[1, 2, 2, 2, 2, 2, 2]}
                    renderItem={this._renderItem}
                    sliderWidth={Width}
                    itemWidth={Width}
                    style={Styles.Carousel}
                />
            </View>

            <TouchableOpacity style={Styles.Button} >
                <Text style={{ fontFamily: FontsApp.Etisalat_0, color: Colors.ofWhiteColr }}>التالى</Text>
            </TouchableOpacity>
        </View>
        )
    }
    componentDidMount() {
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
        width: '90%', height: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WhiteColor, borderRadius: Width * .03, elevation: 5
    }


})
export { Intro } 
import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput, Easing } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FontFamilies } from '../Global/Font';
class plan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: 0,
            valueSlider: 0,
            NamePlan: '',
            AmountValue: '',
            VALUE: 0

        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        let { CurantSelected } = this.state
        return (<View style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: Colors.WhiteColor }}>
            {/* //header */}
            <View style={[Styles.Header, {
                width: '90%',
                height: Height * .1,
                backgroundColor: Colors.WhiteColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }]}>

                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source={Requires.back}
                        resizeMode='contain'
                        style={{
                            width: Width * .05,
                            height: Width * .05
                        }} />
                </TouchableOpacity>
                <View style={{
                    width: Width * .09,
                    height: Width * .09,
                    borderRadius: Width * .05,
                    backgroundColor: Colors.GrayColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={Requires.car2} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={[Styles.TextStyle, { width: Width * .4, textAlign: 'left' }]}>Add Plan Or Goal</Text>
                <TouchableOpacity >
                    <Image source={Requires.remove} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: Width * .09, height: Width * .09, borderRadius: Width * .05, backgroundColor: Colors.GrayColor, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={Requires.edit} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                </TouchableOpacity>



            </View>

            {/* // form enter data */}
            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'2333'}</Text>
                <Text style={Styles.TextStyle}>{'Cost'}</Text>
            </View>


            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'12-02-2018'}</Text>
                <Text style={Styles.TextStyle}>{'Start Date'}</Text>
            </View>
            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'12-06-2018'}</Text>
                <Text style={Styles.TextStyle}>{'End Date'}</Text>
            </View>

            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'39 Days'}</Text>
                <Text style={Styles.TextStyle}>{'Remaining Date'}</Text>
            </View>


            <View style={{ width: '100%', height: Height * .3, alignItems: 'center', justifyContent: 'center', marginTop: Height * .02 }}>

                <AnimatedCircularProgress
                    ref={(ref) => this.circularProgress = ref}

                    size={Width * .37}
                    width={Width * .05}
                    fill={0}
                    rotation={0}
                    duration={1000}

                    tintColor={Colors.red}
                    onAnimationComplete={(VAL) => console.log(VAL, 'onAnimationComplete')}
                    backgroundColor={'#DADADA'} >
                    {
                        (fill) => (
                            <Text style={Styles.TextStyle}>
                                {Math.floor(fill) + '%'}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>


            </View>
        </View>
        )
    }

    componentDidMount() {
        this.circularProgress.animate(35, 2000, Easing.elastic(1)); // Will fill the progress bar linearly in 8 seconds

    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width, height: Height, backgroundColor: Colors.WhiteColor, alignItems: 'center', justifyContent: 'center',
    },
    Header: {

    },
    TextStyle: {
        fontFamily: FontFamilies.Etisalat_2, color: '#5D5D5D'
    },
    perantTextItem: {
        width: '90%', height: Height * .09, backgroundColor: Colors.WhiteColor, alignItems: 'center', borderBottomWidth: 1, borderColor: '#EBEBEB', flexDirection: FixViewsOrder(), justifyContent: 'space-between'
    }
})
export { plan } 
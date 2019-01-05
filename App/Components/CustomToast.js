

import React, { Component } from 'react';
import { Text, View, TextInput, ActivityIndicator, Image, TouchableOpacity, Animated } from 'react-native';
import { Width, Height, FontFamilies } from '../Global';

export class CustomToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            transAnim: new Animated.Value(0),
            transAnim2: new Animated.Value(Height),
            errorMessage:""
        };
    }
    componentDidMount() {
       global.openToast=this.open
    }
    open=(message)=>{
        this.setState({errorMessage:message},()=>{
            delayTime = 0
            Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 1, duration: 300, delay: delayTime,useNativeDriver: true },
                ),
                Animated.timing(
                    this.state.transAnim2,
                    { toValue: Height*.8, duration: 300, delay: delayTime,useNativeDriver: true },
                )
            ]).start(()=>{
                setTimeout(this.close,2100)
            })
        })
    
    }
    close = () => {
        Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                { toValue: 0, duration: 400,useNativeDriver: true },
            ),
            Animated.timing(
                this.state.transAnim2,
                { toValue: Height, duration: 500,useNativeDriver: true },
            )
        ]).start()
    }
    render() {
        return (
            <Animated.View
                style={{
                    transform: [{ translateY: this.state.transAnim2 }],
                    // bottom:this.state.transAnim,
                    position: "absolute",
                    opacity: this.state.fadeAnim,
                    width: Width,
                    height: Height * .1,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <View style={{
                    fontFamily: FontFamilies.Etisalat_0,
                    backgroundColor: "grey",
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius: 4,
                }}>
                    <Text style={{
                        paddingHorizontal: Width * 0.02,
                        paddingVertical: Width * 0.01,
                        fontFamily: FontFamilies.Etisalat_0,                       
                        color: "#fff",
                        textAlign: "center",
                    }}>{this.state.errorMessage}</Text>
                </View>


            </Animated.View>

        )
    }
}
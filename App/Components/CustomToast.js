import React, { Component } from 'React'
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native'
import { Width, Height, Colors } from './../Global'

class CustomToast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animaitionAlert: new Animated.Value(-Height*.1),
            opacity: new Animated.Value(-Height * .2),
            disable: 'auto',
            PositionAlert: 'Bottom', ToValue: 0
        }
    }
    render() {
        return (
            <Animated.View style={[Styles.Container, { paddingHorizontal: Width*.03,height: Height * .055, bottom: this.state.animaitionAlert }]} >
                <Text style={{fontSize: Width * .03, fontWeight: 'bold', color: Colors.ofWhiteColr, textAlign: 'center' }}>{this.props.Massage}</Text>
            </Animated.View>
        )
    }
    componentWillMount() {
    }
    PositionAlert() {
        if (this.props.PositionAlert == 'Left') {
            this.setState({ animaitionAlert: new Animated.Value(-Width) }, () => {
                this.setState({ PositionAlert: 'Left', ToValue: +Width })
            })
        }
        if (this.props.PositionAlert == 'Right') {
            this.setState({ animaitionAlert: new Animated.Value(+Width) }, () => {
                this.setState({ PositionAlert: 'Right', ToValue: +Width })
            })

        }
        if (this.props.PositionAlert == 'Top') {
            this.setState({ animaitionAlert: new Animated.Value(-Height) }, () => {
                this.setState({ PositionAlert: 'Top', ToValue: -Height })
            })
        }
        if (this.props.PositionAlert == 'Bottom') {
            this.setState({ animaitionAlert: new Animated.Value(-Height) }, () => {
                this.setState({ PositionAlert: 'Bottom', ToValue: -Height })
            })
        }
    }
    Open() {
        Animated.timing(this.state.animaitionAlert, {
            toValue: +Height * .07, easing: Easing.elastic(), duration: 400
        }).start(()=>{
            Animated.timing(this.state.animaitionAlert, {
                toValue: -Height * .1, easing: Easing.elastic(), duration: 1000,delay:1000
            }).start(()=>{
                this.props.CloseAlert()
            })
        })
    }

    componentDidMount() {
        this.Open()
    }
}
const Styles = StyleSheet.create(

    {
        Container: {

            position: 'absolute', backgroundColor:'rgba(0,0,0,.66)', borderRadius: Width * .03, alignItems: 'center', justifyContent: 'center'
        },
        button: {
            overflow: 'hidden', width: Width * .7, height: Height * .07, backgroundColor: Colors.MoveColor, alignItems: 'center', justifyContent: 'center', marginTop: Height * .03, borderRadius: Width * .03
        },
        textButton: {
            color: Colors.WhiteColor
        },
        text: {
            marginTop: Height * .04
        }


    }
)
export default CustomToast
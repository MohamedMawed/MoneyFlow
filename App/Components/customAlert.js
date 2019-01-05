import React, { Component } from 'React'
import { BackHandler, StyleSheet, View, Animated, Easing, TouchableWithoutFeedback,} from 'react-native'
import { Height, Width } from '../Global';


class CustomeAlert extends Component {
    constructor(props) {
        super(props)
        const AlertPosition = this.props.AlertPosition == "top" ? "flex-start" : this.props.AlertPosition == "center" ? "center" : "flex-end";
        this.AlertHeight = Math.min(this.props.AlertHeight, 1) * Height
        this.AlertWidth = Math.min(1, this.props.AlertWidth) * Width
        this.TimeOpenClose = 150
        this._animated = new Animated.Value(0)
        this.CurrentAlertHeight = new Animated.Value(Height),
            this.CurrentAlertWidth = new Animated.Value(Width),
            this.state = {
                opacity: new Animated.Value(0),
                disable: 'none',
                AlertHeight: new Animated.Value(Height),
                AlertWidth: new Animated.Value(Width),
                AlertPosition: AlertPosition,
                AlertOpacity: new Animated.Value(0),
                top: 0
            }
        let borderRadius = this.props.borderRadius ? this.props.borderRadius : this.AlertHeight * 0.1
        // console.log("TAG",this.props.type)
        if (this.props.type == "upperounded") {

            this.borderTopRightRadius = borderRadius;
            this.borderTopLeftRadius = borderRadius;
            this.borderBottomRightRadius = 0;
            this.borderBottomLeftRadius = 0;
        }
        else if (this.props.type == "lowerrounded") {
            this.borderTopRightRadius = 0;
            this.borderTopLeftRadius = 0;
            this.borderBottomRightRadius = borderRadius;
            this.borderBottomLeftRadius = borderRadius;
        }
        else if (this.props.type == "rect") {
            this.borderTopRightRadius = 0;
            this.borderTopLeftRadius = 0;
            this.borderBottomRightRadius = 0;
            this.borderBottomLeftRadius = 0;
        } else {
            this.borderTopRightRadius = borderRadius;
            this.borderTopLeftRadius = borderRadius;
            this.borderBottomRightRadius = borderRadius;
            this.borderBottomLeftRadius = borderRadius;
        }
        // console.log("TAG",this.borderTopRightRadius)
        // console.log("TAG",this.borderTopLeftRadius)
        // console.log("TAG",this.borderBottomRightRadius)
        // console.log("TAG",this.borderBottomLeftRadius)
    }
    componentWillReceiveProps(nextProps) {
        // console.log("TAG", "componentWillReceiveProps state: " + nextProps.AlertOpen)
        if (nextProps.AlertOpen) {
            this.Open()
        } else {
            this.Close()
        }
    }

    render() {
        //  console.log("TAG", "Render " + this.props.AlertOpen)
        return (

            <View


                pointerEvents={this.state.disable} style={{
                    justifyContent: this.state.AlertPosition,
                    alignItems: "center",
                    width: Width,
                    height: Height,
                    position: 'absolute',
                    zIndex: 1000,
                    overflow: 'hidden',
                    elevation: Width * .03
                }
                }>
                <TouchableWithoutFeedback onPress={() => { this.props.CloseAlert() }}>
                    <Animated.View style={{
                        width: Width,
                        height: Height,
                        backgroundColor: '#222', position: 'absolute', opacity: this.state.opacity
                    }} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[Styles.Container,
                    {
                        height: this.CurrentAlertHeight,
                        width: this.CurrentAlertWidth,
                        opacity: this.state.AlertOpacity,
                        borderTopRightRadius: this.borderTopRightRadius,
                        borderTopLeftRadius: this.borderTopLeftRadius,
                        borderBottomRightRadius: this.borderBottomRightRadius,
                        borderBottomLeftRadius: this.borderBottomLeftRadius,
                        // transform: [
                        //     { scale: this._animated },
                        // ],
                    }]} >
                    {this.props.children}

                </Animated.View>

            </View >
        )
    }

    Open() {
        //  console.log("TAG", "open alert")
        Animated.timing(this._animated, {
            toValue: 1, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        Animated.timing(this.CurrentAlertHeight, {
            toValue: this.AlertHeight, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        Animated.timing(this.CurrentAlertWidth, {
            toValue: this.AlertWidth, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        // Animated.timing(-100, {
        //     toValue: this.state.Alertposleft, easing: Easing.bounce, duration: 1500
        // }).start()

        Animated.timing(this.state.AlertOpacity, {
            toValue: 1, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        Animated.timing(this.state.opacity, {
            toValue: .6, duration: this.TimeOpenClose
        }).start(() => {
            this.setState({ disable: 'auto' })
            if (this.props.mode == "autoclose") {
                setTimeout(() => { this.props.CloseAlert() }, this.props.closetime);
            }

        })
    }

    Close() {
        Animated.timing(this._animated, {
            toValue: 0, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
       
        Animated.timing(this.CurrentAlertHeight, {
            toValue:Height, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        Animated.timing(this.CurrentAlertWidth, {
            toValue: Width, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()
        Animated.timing(this.state.AlertOpacity, {
            toValue: 0, easing: Easing.linear, duration: this.TimeOpenClose
        }).start()

        Animated.timing(this.state.opacity, {
            toValue: 0, duration: this.TimeOpenClose
        }).start(() => {
            this.setState({ disable: 'none' })
        })
    }
    componentDidMount() {
        //this.Open()
        // console.log("TAG", " componentDidMount state" + this.props.AlertOpen)
        if (this.props.AlertOpen) {
            this.Open()
        } else {
            this.Close()
        }
        BackHandler.addEventListener('hardwareBackPress', () => {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            console.log("TAG", "CustomeAlert back press")
            if (this.props.AlertOpen) {
                console.log("TAG", "open")
                this.props.CloseAlert()
                return true
            }
            //return false
            // if (!this.onMainScreen()) {
            //   this.goBack();
            //   return true;
            // }
            // return false;
        });
    }

}

const Styles = StyleSheet.create(

    {
        Container: {
            alignItems: 'center',
            borderWidth: 3,
            borderColor: 'rgba(150,150,150,.1)',
            elevation: 2,
            backgroundColor: "#fff",
            overflow: 'hidden'
        },



    }
)
export { CustomeAlert }
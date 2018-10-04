import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import {LinearGradient} from 'react-native-linear-gradient'
class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
            // </LinearGradient>
            <View style={{width:'100%',height:'100%'}}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width:'100%',height:'100%'}}>
            <Text >
              Sign in with Facebook
            </Text>
          </LinearGradient>
          </View>
        )
    }
    componentDidMount() {
        // const inter = setInterval(async () => {
        //     const resetAction = NavigationActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'HomeStudent' })] })
        //     this.props.navigation.dispatch(resetAction);
        // }, 10)
    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width, height: Height, backgroundColor: Colors.WhiteColor, alignItems: 'center', justifyContent: 'center',
    }
})
export { Splash } 
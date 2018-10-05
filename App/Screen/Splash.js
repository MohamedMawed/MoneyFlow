import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { Requires } from '../Assets/Requires';
class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>

        return (<LinearGradient colors={[Colors.greenlite, Colors.GreenColor]} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image resizeMode="contain" source={Requires.Logo_main} style={{ width: '40%', height: '40%' }} />
        </LinearGradient>
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
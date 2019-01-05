import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { strings } from '../locals';
import firebase from 'react-native-firebase';
import { getGlobalUser } from '../Global/API';


class EditProfile extends Component {


    constructor(props) {
        super(props)

        // console.log('currentUser', firebase.auth().currentUser.providerData)
        this.state = {
            saveIsLoading: false,
            user: firebase.auth().currentUser,
            newName: firebase.auth().currentUser.providerData[0].displayName,
            newEmail: firebase.auth().currentUser.providerData[0].email,

        }
    }
    componentDidMount = () => {
        // firebase.auth().currentUser.updateProfile({
        //     displayName: "Jane Q. User",
        //     photoURL: "https://example.com/jane-q-user/profile.jpg"
        //   }).then(function() {
        //     // Profile updated successfully!
        //     // "Jane Q. User"
        //     var displayName = user.displayName;
        //     // "https://example.com/jane-q-user/profile.jpg"
        //     var photoURL = user.photoURL;
        //   }, function(error) {
        //     // An error happened.
        //   });
    }
    render() {
        return (
            <View style={{ width: Width, height: '100%', backgroundColor: '#fff', alignItems: 'center' }}>
                <ScrollView style={{
                    width: Width,
                    height: Height
                }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View style={{ width: '90%', height: Height * .07, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Image
                                source={Requires.back}
                                resizeMode='contain'
                                style={{
                                    width: Width * .05,
                                    height: '100%'
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: Width, height: Height * .3, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Requires.Logo} style={{ width: Width * .37, resizeMode: 'contain' }} />
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: Width * .07,
                            color: '#000',
                        }}>{strings('edit_profile_title')}</Text>
                    </View>
                    <View style={{
                        width: Width,
                        height: Height * .55,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>
                        <CustomTextInput
                            Title={strings('name')}
                            value={this.state.newName}
                            onChangeText={(text) => {
                                this.setState({ newName: text })
                            }}
                            icon={Requires.User}
                        />
                        <Text style={{
                            marginVertical: 10,
                            width: Width * .9,
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: 14
                        }}>{strings('edit_profile_requiredText')}</Text>
                        <CustomTextInput
                            Title={strings('current_password')}
                            secure
                            onChangeText={(text) => {
                                this.setState({ currentPassword: text })
                                //console.log(text)
                            }}
                            icon={Requires.Password}
                        />
                        <CustomTextInput
                            Title={strings('email')}
                            value={this.state.newEmail}
                            onChangeText={(text) => {
                                this.setState({ newEmail: text })
                            }}
                            icon={Requires.Email}
                        />

                        <CustomTextInput
                            Title={strings('edit_profile_new_password')}
                            secure
                            onChangeText={(text) => {
                                //console.log(text)
                                this.setState({ newPassword: text })
                            }}
                            icon={Requires.Password}
                        />

                        <View style={{
                            width: Width * .9,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: Height * .06,
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ saveIsLoading: true })
                                    let x = setTimeout(() => {
                                        global.openToast('check internet connection');
                                        this.setState({ saveIsLoading: false })
                                    }, 10000)
                                    this.state.user.updateProfile({
                                        displayName: this.state.newName,
                                    }).then(function () {
                                    }, function (error) {
                                        global.openToast(error)
                                    });
                                    if (this.state.currentPassword &&
                                        this.state.currentPassword != '' &&
                                        this.state.newEmail != this.state.user.providerData[0].email
                                    )
                                        firebase.
                                            auth().
                                            signInWithEmailAndPassword(this.state.user.providerData[0].email,
                                                this.state.currentPassword).then((User) => {

                                                    this.state.user.updateEmail(this.state.newEmail).then(() => {
                                                        this.setState({ saveIsLoading: false });
                                                        clearTimeout(x);
                                                        this.props.navigation.goBack();

                                                    }).catch((error) => {

                                                        if (code == "auth/invalid-email") {
                                                            global.openToast('invalid email format')
                                                        } else if (code == "auth/email-already-in-use")
                                                            global.openToast('email already in use')
                                                        this.setState({ saveIsLoading: false })
                                                        clearTimeout(x)
                                                    })
                                                })

                                    if (this.state.currentPassword &&
                                        this.state.currentPassword != '' &&
                                        this.state.newPassword != this.state.user.currentPassword
                                    )
                                        firebase.
                                            auth().
                                            signInWithEmailAndPassword(this.state.user.providerData[0].email,
                                                this.state.currentPassword).then((User) => {
                                                    this.state.user.updatePassword(this.state.newPassword).then(()=>{
                                                        this.setState({ saveIsLoading: false })
                                                        clearTimeout(x)
                                                        this.props.navigation.goBack();
                                                    }).catch((error) => {
                                                        let code = error.code;
                                                        if (code == "auth/weak-password") {
                                                            global.openToast('weak password')
                                                        }
                                                        clearTimeout(x)
                                                    this.setState({ saveIsLoading: false })
                                                    })
                                                    
                                                })
                                }}
                                style={{
                                    backgroundColor: Colors.BtnLoginBack,
                                    borderRadius: Width * .1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    paddingHorizontal: Width * .06
                                }}>
                                {this.state.saveIsLoading == true ?
                                    <ActivityIndicator size={'small'} color={'#fff'} />
                                    :
                                    <Text style={{
                                        fontFamily: FontFamilies.Etisalat_0,
                                        fontSize: Width * .05,
                                        color: Colors.WhiteColor,
                                    }}>{strings('save')}</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export { EditProfile }
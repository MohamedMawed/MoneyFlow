import React, { Component } from 'React'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown';
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { FontFamilies } from '../Global/Font';
import { FixViewsOrder } from '../Global/Localization';
import { Requires } from '../Assets/Requires';
import { getAppLanguage } from '../locals';
class Dropdown2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // options: this.props.Data,
            options: this.props.Data,
            dropdownHeight: 0,
            borderColor: Colors.BorderColor,
            arrowSource: this.props.Data[1].Icon
        }
    }
    render() {

        return (
            <TouchableOpacity activeOpacity={.9} style={[Styles.perantDropDown, { width: this.props.Width, alignItems: 'center' }]} onPress={() => {
                this.refs.dropdown1.show()
             }}>

       

                <ModalDropdown
                    renderButtonText={(item, index) => {
                        //console.log(item, "itemitemitemitem")
                        this.setState({ arrowSource: item.Icon })
                        return (<Text style={{width:Width*.41,textAlign:'center', fontFamily: FontFamilies.Etisalat_0}}>
                            {item.text}
                        </Text>)
                    }}
                    renderRow={(item, index, IsSelected) => {
                        return (<View style={{ width: '100%', height: Height * .06, backgroundColor: IsSelected ? '#DADADA' : '#FAFAFA', paddingHorizontal: Width * .04, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: FontFamilies.Etisalat_0,fontSize:12}}>{item.text}</Text>
                        </View>)
                    }}
                    disabled={this.state.options.length < 1 ? true : false}
                    showsVerticalScrollIndicator={false}
                    // disabled={this.state.AllNameStudent.length <= 0 ? true : false}
                    ref="dropdown1"
                    dropdownTextHighlightStyle={Styles.dropdownTextHighlightStyle}
                    onSelect={(value) => {
                        if (this.props.returnIndex) {
                            this.props.onSelect(value)
                        }
                        else {
                            this.props.onSelect(this.state.options[value])
                        }
                    }}
                    
                    renderSeparator={() => null}
                    dropdownTextStyle={[{ fontFamily: FontFamilies.Etisalat_0},Styles.dropdownTextStyle]}
                    dropdownStyle={[Styles.dropdownStyle, { width: this.props.DropdownWidth, height: this.state.dropdownHeight,transform:[{translateX:getAppLanguage()=='ar'? -Width*.49:0}] }]}
                    textStyle={[Styles.textStyle,{fontFamily: FontFamilies.Etisalat_0,fontSize:13,includeFontPadding:true,marginTop:5}]}
                    style={Styles.DropDown}
                    defaultValue={this.props.defaultValue} options={this.state.options}
                    defaultIndex={this.props.defaultIndex} />

              <TouchableOpacity activeOpacity={.9} onPress={() => {
                this.refs.dropdown1.show()
             }} style={{ width:  Width*.12, height: Height * .06, left:0, position: 'absolute', alignItems: 'center', justifyContent: 'center',borderRightWidth:1,borderColor:'#D7D7D7' }}>
                    <Image resizeMode='contain' style={{ width: Width * .05, height: Height * .05, tintColor: Colors.DarkGrayColor}} source={Requires.refresh} />
                </TouchableOpacity>


                  <TouchableOpacity activeOpacity={.9} onPress={() => {
                this.refs.dropdown1.show()
             }} style={{ width: Width*.1, height: Height * .06,  right:0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ width: Width * .03, height: Height * .03, tintColor: Colors.DarkGrayColor}} source={Requires.arrow_dropdown} />
                </TouchableOpacity>


            </TouchableOpacity>
        )
    }
    componentWillReceiveProps(props) {
        this.setState({ options: props.Data }, () => {
            this.SetHeight()
        })
        if (props.Error)
            this.setState({ borderColor: Colors.red })
        else {
            this.setState({ borderColor: Colors.BorderColor })

        }
    }
    SetHeight() {
        let { options } = this.state
        if (options.length > 3) {
            this.setState({ dropdownHeight: Height * .24 })
        }
        else {
            this.setState({ dropdownHeight: (Height * .06) * options.length })
        }
    }
    componentWillMount() {
        this.setState({ options: this.props.Data }, () => {
            this.SetHeight()
        })

    }
}
const Styles = StyleSheet.create({
    DropDown: {
        width: "100%", justifyContent: 'center', height: Height * .06
    },
    dropdownTextHighlightStyle: {
        backgroundColor: '#F74994', color: '#fff', fontSize: Width * 0.038, borderRadius: Width * .02, width: "100%", fontFamily: FontFamilies.Etisalat_0
    }, dropdownTextStyle: {
        backgroundColor: Colors.WhiteColor, color: '#000', height: Height * .06, textAlign: 'center', fontSize: Width * 0.038, fontFamily: FontFamilies.Etisalat_0
    },
    textStyle: {
        color: Colors.borderColor, width: Width * .41, fontSize: Width * 0.038,textAlign: 'center', paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0
    },
    dropdownStyle: {
        width: "20%", backgroundColor: Colors.WhiteColor, borderRadius: Width * .035, height: Height * .06, overflow: 'hidden', marginTop: Width * .05, elevation: 10, justifyContent: 'center'
    },
    perantDropDown:
        { width: "100%",  borderRadius: Width * .02, justifyContent: 'center', alignItems: 'center' ,borderColor: '#D7D7D7',
      borderColor: '#D7D7D7', borderWidth: 1,height: Height * .06,   backgroundColor: '#F9F9F9'


    }


})


export default Dropdown2
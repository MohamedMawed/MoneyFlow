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
class DropDown extends Component {
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
            <TouchableOpacity activeOpacity={.9} style={[Styles.perantDropDown, { width: this.props.Width, borderColor: this.state.borderColor, alignItems: 'center' }]} onPress={() => {
                this.refs.dropdown1.show()
             }}>
                <ModalDropdown
                    renderButtonText={(item, index) => {
                        //console.log(item, "itemitemitemitem")
                        this.setState({ arrowSource: item.Icon })
                        return (<Text>
                            {item.text}
                        </Text>)
                    }}
                    renderRow={(item, index, IsSelected) => {
                        //console.log(item, "itemitemitemitem")

                        return (<View style={{ width: '100%', height: Height * .06, backgroundColor: IsSelected ? '#DADADA' : '#FAFAFA', paddingHorizontal: Width * .04, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{item.text}</Text>
                            <Image resizeMode='contain' style={{ width: Width * .05, height: Height * .05, tintColor: this.props.TintColor ? IsSelected ? '#FAFAFA' : Colors.DarkGrayColor : null }} source={item.Icon}  >
                            </Image>
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
                    dropdownTextStyle={Styles.dropdownTextStyle}
                    dropdownStyle={[Styles.dropdownStyle, { width: this.props.DropdownWidth, height: this.state.dropdownHeight }]}
                    textStyle={Styles.textStyle}
                    style={Styles.DropDown}
                    defaultValue={this.props.defaultValue} options={this.state.options}
                    defaultIndex={this.props.defaultIndex} />
                <TouchableOpacity activeOpacity={.9} onPress={() => {
                this.refs.dropdown1.show()
             }} style={{ width: Width * .12, height: Height * .05, backgroundColor: '#fff', right: Width * .05, position: 'absolute', borderRadius: Width * .05, alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ width: Width * .05, height: Height * .05, tintColor: this.props.TintColor ? Colors.DarkGrayColor : null }} source={this.state.arrowSource} />
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
        width: "100%", justifyContent: 'center', height: Height * .07, backgroundColor: '#FAFAFA', borderRadius: Width * .07
    },
    dropdownTextHighlightStyle: {
        backgroundColor: '#F74994', color: '#fff', fontSize: Width * 0.038, borderRadius: Width * .02, width: "100%", fontFamily: FontFamilies.Etisalat_0
    }, dropdownTextStyle: {
        backgroundColor: Colors.WhiteColor, color: '#000', height: Height * .06, textAlign: 'center', fontSize: Width * 0.038, fontFamily: FontFamilies.Etisalat_0
    },
    textStyle: {
        color: Colors.borderColor, width: Width * .8, fontSize: Width * 0.038, textAlign: 'right', textAlign: 'left', paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0
    },
    dropdownStyle: {
        width: "20%", backgroundColor: Colors.WhiteColor, borderRadius: Width * .035, height: Height * .06, overflow: 'hidden', marginTop: Width * .05, elevation: 10, justifyContent: 'center'
    },
    perantDropDown:
        { width: "100%", backgroundColor: Colors.WhiteColor, borderRadius: Width * .1, justifyContent: 'center', alignItems: 'center' }

})


export default DropDown
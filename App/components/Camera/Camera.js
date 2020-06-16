import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Cropper from 'react-easy-crop'
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, Text } from "react-native";
import { flipCamera, snap } from './functions'
import ImageEdit from 'react-native-imageedit'

export default class HandleOpenCamera extends Component {


    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            status: '',
            type: Camera.Constants.Type.front
        }

    }

    componentDidMount() {

    }
    render() {
        return (
            this.state.result ?
                <View style={{ flex: 1 }}>
                    <ImageEdit
                        containerStyle={{ flex: 1 }}
                        width={400}
                        height={300}
                        image={this.state.result} //Image uri
                        ref={ref => this._imageEdit = ref}
                        scaled={true}
                    >
                    </ImageEdit>
                </View>
                : <Camera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{ flex: 1 }}
                    autoFocus={true}
                    type={this.state.type}

                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{

                                alignSelf: 'flex-end',
                                marginLeft: 25,
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                flipCamera(this)
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginLeft: '30%',
                                alignSelf: 'flex-end',
                                alignItems: 'flex-start',
                            }}
                            onPress={() => {
                                snap(this)
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Tirar foto </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
        )

    }


}
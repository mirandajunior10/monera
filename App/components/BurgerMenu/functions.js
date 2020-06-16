import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera'


export async function handleImagePicker(context) {

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
        return
    }
    else {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        context.setState({ uri: result.uri })

    }


}

export async function handleOpenCamera(context) {


    const { status } = await Camera.requestPermissionsAsync()

     if(status === 'granted') {
        context.bottomSheet.close()   
        context.props.navigation.navigate("Camera")
     }
    else return 




}
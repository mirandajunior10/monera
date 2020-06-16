import React, { Component } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var bottomSheetActions = bottomSheetActions = [
    {

        title: 'Selecionar uma imagem da biblioteca',
        icon: (
            <MaterialCommunityIcons name="folder" color="grey" size={24} />
        )
    },
    {
        title: 'Usar a câmera',
        icon: (
            <MaterialCommunityIcons name="camera" color="grey" size={24} />
        )
    }
]
export default bottomSheetActions
import React from 'react'
import { Animated, View, Text, FlatList, Alert, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


export default function RightActions(props){
    const {
        styles,
        progress,
        dragX,
        onPress
    } = props;

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);


        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={styles.rightAction} onPress={onPress}>
                <AnimatedIcon
                    name="md-trash"
                    size={30}
                    color="#fff"
                    style={[styles.actionIcon, { transform: [{ scale }] }]}
                />
            </RectButton>
        );
    
}
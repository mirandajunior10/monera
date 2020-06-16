import { Camera } from 'expo-camera';
import ImageEditor from '@react-native-community/image-editor';


export function flipCamera(context) {
    let type = context.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    context.setState({ type })
}

export async function snap(context) {
    let result = await context.camera.takePictureAsync()
    context.setState({ result })

}
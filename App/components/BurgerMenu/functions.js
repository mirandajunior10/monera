import ImagePicker from 'react-native-image-crop-picker';
import { storage, auth, database } from '../../config/config';


export async function handleImagePicker(context) {


    try {
        let result = await ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            cropperStatusBarColor: '#00C79C',
            cropperToolbarColor: '#00C79C',
            cropperToolbarTitle: 'Redimensionar',
            useFrontCamera: true,
            mediaType: 'photo',
            showCropGuidelines: false,
            cropperActiveWidgetColor: '#FBE158'
        })

        handleprofilePicUpload(result, context)


    } catch (error) {
        console.log(error.code)
    }


}

export async function handleOpenCamera(context) {

    try {
        let result = await ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            cropperStatusBarColor: '#00C79C',
            cropperToolbarColor: '#00C79C',
            cropperToolbarTitle: 'Redimensionar',
            useFrontCamera: true,
            mediaType: 'photo',
            showCropGuidelines: false,
            cropperActiveWidgetColor: '#FBE158'
        })

        handleprofilePicUpload(result, context)
    } catch (error) {
        console.log(error.code)
    }


}

async function handleprofilePicUpload(result, context) {
    context.setState({ imagePath: result.path })

    const response = await fetch(result.path);
    const blob = await response.blob();

    let uploadTask = storage.ref('users/' + auth.currentUser.uid + '/profilePic').put(blob)
    uploadTask.on('state_changed', snapshot => {
        //Função que monitora o progresso de upload, útil caso queira mostrar para o usuário

    }, error => {
        console.log('Error with upload -', error);
    }, async () => {
        try {

            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            await database.ref('users/' + auth.currentUser.uid + '/profilePic').set(downloadURL)

        } catch (error) {
            console.log(error)
        }

    });
}
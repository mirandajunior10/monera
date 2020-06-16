import ImagePicker from 'react-native-image-crop-picker';


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
    
        console.log(result)
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
        console.log(result)
     } catch (error) {
         console.log(error.code)
     }

  

   





}
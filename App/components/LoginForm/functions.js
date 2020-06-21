import { auth } from '../../config/config';

export const handleSubmit = async (values, formikBag, context) => {
    //Force user to login
    var email = values.email;
    var password = values.password;

    if (email != '' && password != '') {
      formikBag.setSubmitting(true);
      try {
        let logInInfo = await auth.signInWithEmailAndPassword(email, password); //'test@user.com', 'password'

       
        context.props.navigation.navigate("HomeScreen");


      } catch (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code);

        switch (errorCode) {
          case "auth/user-not-found":
            errorMessage = "Usuário não encontrado"
            break;

          case "auth/wrong-password":
            errorMessage = "Senha incorreta"
            break;
          default:
            break;
        }

        alert(errorMessage);

      }


    } else {
      alert('email ou senha estão vazios..')
    }
  };
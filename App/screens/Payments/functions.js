import { database, auth } from '../../config/config';
import axios from 'axios';

export function handleAction(context, name) {
    switch (name) {
      case 'codigo_manual':
        context.setState({ codigoOverlay: true })
        // context.setState({ dialogReceitaVisible: true });
        break;
      default:
        break;
    }
  }

  export function handleCancel(context) {
    context.setState({
      codigoOverlay: false,
    });
  };
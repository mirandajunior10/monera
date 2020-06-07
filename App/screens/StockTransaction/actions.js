import { Icon } from "react-native-elements";
import React from 'react';

var actions = actions = [{
    text: 'Adicionar Receita',
    icon: <Icon
      name="md-trending-up"
      type="ionicon"
      color="white" />,
    name: 'add_receita',
    color: '#00C79C',
    position: 1
  },{
    text: 'Adicionar Despesa',
    icon: <Icon
      name="md-trending-down"
      type="ionicon"
      color="white" />,
    name: 'add_despesa',
    color: '#FF6D6B',
    position: 2
  }]


export default actions
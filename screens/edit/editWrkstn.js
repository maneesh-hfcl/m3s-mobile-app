import React, { useEffect } from 'react';
import {View, Text} from 'react-native';

function EditWrkstn({route, navigation}) {
    const {editItem} = route.params;
    useEffect(()=>{
        console.log(editItem);
    });
  return(
    <View>
        <Text>Edit workstation</Text>
    </View>
  )
}

export default EditWrkstn;

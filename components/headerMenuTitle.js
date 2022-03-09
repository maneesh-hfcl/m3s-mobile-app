import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { globalStyles } from "../shared/global";
import { MaterialIcons } from '@expo/vector-icons';

const HeaderMenuTitle = ({navigation, lnkMenu}) => {
    return(
            <MaterialIcons  
                name="add" size={20} color="#b80202" onPress={() => navigation.navigate(lnkMenu)}
                style={[globalStyles.plusIcon, styles.icon]}  />
    )
}

export default HeaderMenuTitle; 

const styles = StyleSheet.create({
    icon:{
        alignSelf:'flex-end',
       backgroundColor:'white',
        marginHorizontal:15,
    },
    header:{
       
      alignSelf:'flex-start',
    },
    headerTitle:{
        color:'#89c2d9',
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        
        
    }
})

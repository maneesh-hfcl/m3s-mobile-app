import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerMenuDesign({menuText, iconName, menuColor}){
    return(
            (iconName != 'server')?
            (
                <MaterialIcons name={iconName} size={24} color={menuColor} />
            )
            :(
                <Ionicons name={iconName} size={24} color={menuColor} />
            )
    )
}

const styles = StyleSheet.create({
    vwMenu:{
        backgroundColor:'#eee',
        width:90,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#9de0c1',
        alignItems:'center',
        margin:20,
        alignContent:'space-between',
        elevation:10,
        borderStyle:"dashed"
    },
    vwIcon:{
        marginHorizontal:5,
        marginVertical:10,
    },
    vwMenuText:{
        backgroundColor:'#9de0c1',
        width:'100%',
        borderWidth:0,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        textAlign:'center',
        paddingVertical:2,
        fontSize:15      
    }
})
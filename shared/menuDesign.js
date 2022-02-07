import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function MenuDesign({menuText, iconName, menuColor, onPress}){
    return(
            <TouchableOpacity onPress={onPress}>
                <View style={styles.vwMenu}>
                    <View style={styles.vwIcon}>
                        {
                            (iconName != 'server')?
                            (
                                <MaterialIcons name={iconName} size={34} color={menuColor} />
                            )
                            :(
                                <Ionicons name={iconName} size={34} color={menuColor} />
                            )
                        }   
                    </View>
                    <View style={styles.vwMenuText}>
                        <Text style={{fontWeight:'bold', color:'green', fontSize:13}}>{menuText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
       
    )
}

const styles = StyleSheet.create({
    vwMenu:{
        backgroundColor:'#eee',
        width:100,
        borderRadius:10,
        borderWidth:0,
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
        backgroundColor:'#bce6c1',
        width:'100%',
        borderWidth:0,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        textAlign:'center',
        paddingVertical:5,
        paddingHorizontal:5,
        fontSize:15,
        alignItems:'center',
        fontWeight:'bold'      
    },
})
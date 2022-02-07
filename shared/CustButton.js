import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default function CustButton({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:8,
        paddingVertical:3,
        paddingHorizontal:3,
        backgroundColor:'#726285',
        marginTop:5,
        marginBottom:5,
        borderWidth:4,
        borderColor:'#947db0',
    },
    buttonText:{
        color:'#eee',
        fontWeight:'bold',
        fontSize:14,
        textAlign:'center',
        paddingVertical:5,
        paddingHorizontal:5
    }
})
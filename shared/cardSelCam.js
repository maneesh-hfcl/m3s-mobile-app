import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function CardSelCam(props){
    return(
        <View style={[styles.card, (props.selectedCam?styles.cardSelected:'')]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

 const styles = StyleSheet.create({
     card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:'#eee',
        marginHorizontal:5,
        marginVertical:6,
        borderColor:'#c4c4c4',
        borderWidth:1,
     },
     cardSelected:{
        backgroundColor:'#ffebe0'
     },
     cardContent:{
        marginHorizontal:10,
        marginVertical:5,
        textAlign:'center',
    }
 })
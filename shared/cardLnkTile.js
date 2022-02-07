import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function CardLnkTitle(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

 const styles = StyleSheet.create({
     card:{
        marginHorizontal:4,
        marginVertical:2,
        width:'48%'
     },
     cardContent:{
        marginHorizontal:10,
        marginVertical:2,
        borderBottomWidth:1,
        borderBottomColor:'#dbdbdb',
        backgroundColor:"#dbdbdb",
        
        paddingVertical:5,
        paddingHorizontal:10,
        borderLeftWidth:1,
        borderColor:'#c4c4c4',

    }
 })
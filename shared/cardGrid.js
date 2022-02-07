import React, { useEffect } from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function CardGrid(props){
    
    return(
        <View style={[styles.card, (props.type=='header'?styles.cardHeader:'')]}>
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
       backgroundColor:'#fff',
       shadowOffset:{width:1, height:1},
       shadowColor:'#333',
       shadowOpacity:0.3,
       shadowRadius:2,
       marginHorizontal:4,
       marginVertical:6,

     },

    cardContent:{
       marginHorizontal:5,
       marginVertical:5,

   },
   cardHeader:{
       backgroundColor:'#1d3dad',
       color:'#fff',
   }
})
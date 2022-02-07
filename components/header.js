import React from "react";
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

import { globalStyles } from "../shared/global";

export default function Header({headerText}){
    return(
            <View style={styles.header}>
                <Image style={{width:'100%', height:200}} source={require('../assets/m3sImage/Splash_Back.jpg')}  />
                {/* <Text style={globalStyles.headerTitle}>{headerText}</Text> */}

            </View>

    )
}

const styles = StyleSheet.create({
    header:{
        marginVertical:30,
        marginBottom:20,
        backgroundColor:'transparent',
        alignItems:'flex-end',

    }
})
import React from "react";
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

import { globalStyles } from "../shared/global";

export default function HeaderOther({headerText}){
    return(
            <View style={styles.header}>
                <Image source={require('../assets/m3sImage/hop180x76dgrey.png')}
                 style={{width:100, height:50}} />
            </View>
    )
}

const styles = StyleSheet.create({
    header:{

        flexDirection:"row",
        backgroundColor:'#316d85',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingRight:20,
        paddingBottom:10,
        marginTop:40,
        height:60,
    }
})
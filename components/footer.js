import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { globalStyles } from "../shared/global";

export default function FooterComponent({headerText}){
    return(
        <View style={styles.footer}>
            <Text style={globalStyles.headerTitle}>Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        justifyContent:'space-between',
        alignContent:'flex-end',
        
        backgroundColor:'#50806d',
        alignItems:'flex-end',
        paddingRight:20,
    }
})
import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"; 
import HeaderOther from "./headerOtherScreen";

export default function CustomDrawerHeader(props){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <View style={{backgroundColor:"#316d85", alignItems:'center', paddingVertical:5}}>
                <Image source={require('../assets/m3sImage/hop180x76dgrey.png')} style={{width:100, height:50}} />
            </View>
            <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Text>App Version: 1.0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        position:"absolute",
        bottom:50,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})

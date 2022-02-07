import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "../components/header";
import HeaderOther from "../components/headerOtherScreen";
import Menus from "../components/menu";
import { globalStyles } from "../shared/global";

export default function Home({navigation}){
    return(
        <View>
            <HeaderOther />       
            <Menus navigation={navigation} />
        </View>
    )
}
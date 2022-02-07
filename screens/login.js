import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import FooterComponent from "../components/footer";
import Header from "../components/header";
import LoginComponent from "../components/loginComponent";
import MapComponent from "../components/mapComponent";
import {globalStyles} from '../shared/global';

export default function Login({navigation}){
    return(
        <View style={globalStyles.container}>
            {/* header */}
            <Header headerText="M3S" />
            <View style={globalStyles.content}>
                <LoginComponent navigation={navigation} />
            </View>

        </View>
    )
}
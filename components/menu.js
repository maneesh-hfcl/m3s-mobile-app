import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MenuDesign from "../shared/menuDesign";

export default function Menus({navigation}){
    const pressHandler = (goToMenu)=>{
       // alert("You have clicked to get the live icon"); 
       navigation.navigate(goToMenu);
    }

    return(
        <View style={styles.menuContainer}>
            <MenuDesign menuText='Live' iconName='camera-alt' menuColor='gray' onPress={() => pressHandler('Live')} />
            <MenuDesign menuText='Recording' iconName='fiber-manual-record' menuColor='gray' />
            <MenuDesign menuText='Server' iconName='server' menuColor='gray' onPress={() => pressHandler('ServerStack') } />
            <MenuDesign menuText='Workstation' iconName='computer' menuColor='gray' onPress={()=>pressHandler('WrkstnStack')} />
            <MenuDesign menuText='Event' iconName='event' menuColor='gray' onPress={() => pressHandler('Event')} />
            <MenuDesign menuText='Bookmark' iconName='bookmarks' menuColor='gray' onPress={() => pressHandler('BkmrkStack')} />
            <MenuDesign menuText='Map' iconName='map' menuColor='gray' onPress={() => pressHandler('Map')} />
            <MenuDesign menuText='Users' iconName='person' menuColor='gray' onPress={() => pressHandler('UsrStack')} />
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flexWrap:"wrap", 
        paddingTop:50
    }
})
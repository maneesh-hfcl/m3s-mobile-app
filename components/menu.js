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
            <MenuDesign menuText='Event' iconName='event' menuColor='gray' />
            <MenuDesign menuText='Bookmark' iconName='bookmarks' menuColor='gray' />
            <MenuDesign menuText='User' iconName='person' menuColor='gray' />
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
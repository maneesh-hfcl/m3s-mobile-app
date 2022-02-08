import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import EditSrvr from "../screens/edit/editSrvr";
import Servers from "../screens/server";
import BackHeader from "../components/backHeader";
import { Dimensions } from "react-native";
import AddSrvr from "../screens/add/addSrvr";

const Stack = createNativeStackNavigator();

const SrvrStackScreens = ()=>{
    return(
        <Stack.Navigator initialRouteName="Server" screenOptions={{
            
        }}>
            <Stack.Screen name="Server" component={Servers} 
                options={{
                    headerShown:false
                }}
             />
             <Stack.Screen name="AddServer" component={AddSrvr} 
                options={{
                    title:'Add server'
                }}
            />
            <Stack.Screen name="EditServer" component={EditSrvr} 
                options={{
                    title:'Edit server'
                }}
            />
        </Stack.Navigator>
    )
}

export default SrvrStackScreens;
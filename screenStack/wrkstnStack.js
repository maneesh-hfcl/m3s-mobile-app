import React from "react";
import {View} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workstations from "../screens/wrkstn";
import AddWrkstn from "../screens/add/addWrkstn";
import EditWrkstn from "../screens/edit/editWrkstn";

const Stack = createNativeStackNavigator();

const WrkstnStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Workstation" 
                options={{headerShown:false}}
            component={Workstations} />
            <Stack.Screen name="AddWorkstation" 
                options={{
                    title:'Add'
                }}
            component={AddWrkstn} />
            <Stack.Screen name="EditWorkstation" 
                options={{
                    title:'Edit'
                }}
            component={EditWrkstn} />
        </Stack.Navigator>
    )
}

export default WrkstnStack;
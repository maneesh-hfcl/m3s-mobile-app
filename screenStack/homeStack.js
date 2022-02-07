import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Home from "../screens/home";
import Login from "../screens/login";
import LiveScreen from "../screens/live";
import Servers from "../screens/server";
import Workstations from "../screens/wrkstn";
import DrawerMenuScreens from "./drawerMenuStack";

const HomeStack = createNativeStackNavigator();

const HomeStackScreens = () =>{
    return(
        <HomeStack.Navigator
            screenOptions={{
                headerShown:false                
            }}
        >
            <HomeStack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <HomeStack.Screen name="Home" component={Home}  />
            

        </HomeStack.Navigator>
    )
}

export default HomeStackScreens;
import React from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Users from "../screens/users";
import EditSrvr from "../screens/edit/editSrvr";
import EditUsr from "../screens/edit/editUsr";
import AddUsr from "../screens/add/addUsr";

const Stack = createNativeStackNavigator();

const UsrStackScreens = () =>{
    return(
        <Stack.Navigator initialRouteName="Users">
            <Stack.Screen name="Users" component={Users} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="EdtUsr" component={EditUsr} 
                options={{
                    title:'Edit user'
                }}
            />
            <Stack.Screen name="AddUsr" component={AddUsr}
                options={{
                    title: 'Add user'
                }}
            />
        </Stack.Navigator>
    )
}

export default UsrStackScreens;
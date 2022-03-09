import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bookmark from "../screens/bookmark";
import AddBkmrk from "../screens/add/addBkmrk";
import EdtBkmrk from "../screens/edit/edtBkmrk";

const Stack = createNativeStackNavigator();

const BkmrkStackScreens = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Bookmark" component={Bookmark}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="AddBkmrk" component={AddBkmrk}
                options={{
                    title:'Add bookmark'
                }}
             />
            <Stack.Screen name="EdtBkmrk" component={EdtBkmrk}
                options={{
                    title:'Edit bookmark'
                }}
             />
        </Stack.Navigator>
    )
}

export default BkmrkStackScreens;
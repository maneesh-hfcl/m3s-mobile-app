import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import LiveScreen from "../screens/live";
import Workstations from "../screens/wrkstn";
import Home from "../screens/home";

import DrawerMenuDesign from "../shared/drawerMenuDesign";
import Login from "../screens/login";
import SrvrStackScreens from "./srvrStack";
import HeaderOther from "../components/headerOtherScreen";
import CustomDrawerHeader from "../components/customDrawerHeader";
import 'react-native-gesture-handler';

import HomeStackScreens from "./homeStack";

const Drawer = createDrawerNavigator();

const DrawerMenuScreens = () =>{
    return(
        <Drawer.Navigator

            screenOptions={{
                headerTitleAlign:'center',
                headerStyle:{
                    backgroundColor:'#316d85',
                    height:90,
                },
                headerTintColor:'#99b4bf',
                
                headerTitleStyle:{
                    color:'#89c2d9',
                    fontWeight:'bold',
                    fontSize:20,
                },
                borderColor:'#fae950',
                borderBottomWidth:2,
                drawerPosition: 'left',
                drawerType:'slide',
                
                headerTitle:() => (
                         <HeaderOther headerText='' />
                                                        // <View style={globalStyles.vwRow}>
                            //     <LogoTitle />
                            //     <Text>{props.headerTitle}</Text>
                            // </View>
                         ),
                        
            }}
           drawerContent={(props) => <CustomDrawerHeader {...props} />}
        >

        <Drawer.Screen name="HomeStack" component={HomeStackScreens} 
               options={({navigation}) =>(
                {
//                    title:'Home',
                    // drawerLabelStyle : {width : Dimensions.get('window').width},
                    // title:({navigation, route ,options}) =>{
                    //     return <HeaderOther headerText='' />
                    // // },
                    drawerIcon:({focused, size}) =>(
                        <DrawerMenuDesign menuText='Home' iconName='home' menuColor='gray' />
                    ),
                    drawerLabel:'Home',
                    headerShown:false,
                    swipeEnabled:false,
                }
                )
                }
            
                />
            <Drawer.Screen name="Live" component={LiveScreen}
                options={() => ({
                    drawerIcon:({focused, size}) =>(
                        <DrawerMenuDesign menuText='Live' iconName='camera-alt' menuColor='gray'  />
                    ),
                    // headerTitle:()=>(
                    //     <HeaderOther headerText='Camera Viewing' />
                    // ),
                    headerTitle:'Camera viewing',
                    headerTitleAlign:"center",
                    
                })
                
            }
            />
            <Drawer.Screen name="ServerStack" component={SrvrStackScreens} headerTitle="God Workstation"
               options={() => ({
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Server' iconName='server' menuColor='gray' />
                ),
                drawerLabel:'Server',
              headerTitle:'Server'
            })}


            />
            <Drawer.Screen name="Workstation" component={Workstations} title="God Workstation" 
            options={() => ({
                drawerLabel:'Workstation',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='computer' menuColor='gray' />
                ),
                headerTitle:'Workstation'  
            })}
            />
            <Drawer.Screen name="Event" component={Workstations} 
            options={() => ({
                drawerLabel:'Event',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='event' menuColor='gray' />
                ),
                headerTitle:'Event'  
            })}
            />
            <Drawer.Screen name="Bookmark" component={Workstations} 
            options={() => ({
                drawerLabel:'Bookmark',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='bookmarks' menuColor='gray' />
                ),
                headerTitle:'Bookmark'  
            })}
            />
            <Drawer.Screen name="User" component={Workstations} 
            options={() => ({
                drawerLabel:'User',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='person' menuColor='gray' />
                ),
                headerTitle:'User'  
            })}
            />
            <Drawer.Screen name="Sign out" component={Login} 
            options={() => ({
                drawerLabel:'Sign out',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='logout' menuColor='gray' />
                ),
                headerShown:false,
                swipeEnabled:false
            })}
            />
        </Drawer.Navigator>
    )
}

export default DrawerMenuScreens;
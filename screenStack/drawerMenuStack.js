import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Button} from 'react-native';
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
import WrkstnStack from "./wrkstnStack";
import Events from "../screens/event";
import Bookmark from "../screens/bookmark";
import Users from "../screens/users";
import UsrStackScreens from "./usrStack";
import BkmrkStackScreens from "./bkmrkStack";
import Header from "../components/header";
import HeaderMenuTitle from "../components/headerMenuTitle";
import { MaterialIcons } from '@expo/vector-icons';
import Map from "../screens/map";

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
                    headerRight:()=>(
                        <TouchableOpacity onPress={() => changeTile(1)}>
                            <MaterialIcons name="add-circle" size={32} color="#b80202" style={{marginVertical:5, marginHorizontal:10}} />
                        </TouchableOpacity>
                         
                    ) 
                    
                })
                
            }
            />
            <Drawer.Screen name="ServerStack" component={SrvrStackScreens} headerTitle="God Workstation"
               options={({navigation, route}) => ({
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Server' iconName='server' menuColor='gray' />
                ),
                drawerLabel:'Server',
                headerTitle:'Server',
                headerRight:()=>(
                    <HeaderMenuTitle navigation={navigation} lnkMenu='AddServer' />
                     
                ) 
            })}


            />
            <Drawer.Screen name="WrkstnStack" component={WrkstnStack} title="God Workstation" 
            options={({navigation}) => ({
                drawerLabel:'Workstation',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='computer' menuColor='gray' />
                ),
                headerTitle:'Workstation',
                headerRight:()=>(
                    <HeaderMenuTitle navigation={navigation} lnkMenu='AddWorkstation' />
                     
                )   
            })}
            />
            <Drawer.Screen name="Event" component={Events} 
            options={() => ({
                drawerLabel:'Event',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='event' menuColor='gray' />
                ),
                headerTitle:'Event'  
            })}
            />
            <Drawer.Screen name="BkmrkStack" component={BkmrkStackScreens} 
            options={({navigation}) => ({
                drawerLabel:'Bookmark',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='bookmarks' menuColor='gray' />
                ),
                headerTitle:'Video Bookmark',
                headerRight:()=>(
                    <HeaderMenuTitle navigation={navigation} lnkMenu='AddBkmrk' />
                     
                )  
            })}
            />
            <Drawer.Screen name="UsrStack" component={UsrStackScreens} 
            options={() => ({
                drawerLabel:'Users',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Workstation' iconName='person' menuColor='gray' />
                ),
                headerTitle:'Users'  
            })}
            />

            <Drawer.Screen name="Map" component={Map} 
                options={() => ({
                drawerLabel:'Map',
                drawerIcon:({focused, size}) =>(
                    <DrawerMenuDesign menuText='Map' iconName='map' menuColor='gray' />
                ),
                headerTitle:'Map'
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
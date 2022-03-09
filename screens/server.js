import React, { useEffect } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useState } from "react/cjs/react.development";
import Header from "../components/header";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";
import { MaterialIcons } from '@expo/vector-icons';
import FooterComponent from "../components/footer";
import svcUrl from "../config/svcUrl";
import { LoadGrid } from "../shared/globalFunc";

export default function Servers({navigation}){

    const initSrvrLst = [
        {id:1, sym:'NVR1', name:'NVR 1', ipAdd:'http://172.17.6.47', port:'8001', type:'Server', status:'Ready', expand:false},
        {id:2, sym:'NVR2', name:'NVR 2', ipAdd:'http://172.17.6.47', port:'8001', type:'Server', status:'Ready', expand:false},
        {id:3, sym:'NVR3', name:'NVR 3', ipAdd:'http://172.17.6.47', port:'8001', type:'Server new server', status:'Ready' , expand:false},
        {id:4, sym:'NVR4', name:'NVR 4', ipAdd:'http://172.17.6.47', port:'8001', type:'Server', status:'Ready', expand:false},
        {id:5, sym:'NVR5', name:'NVR 5', ipAdd:'http://172.17.6.47', port:'8001', type:'Server new server', status:'Ready', expand:false},
        {id:6, sym:'NVR6', name:'NVR 6', ipAdd:'http://172.17.6.47', port:'8001', type:'Server', status:'Ready', expand:false},
    ]
    const[srvrLst, setSrvrLst] = useState([]);

    useEffect(()=>{
        loadData();
    },[])

    const goToMenu = (menuClicked) =>{
        navigation.navigate(menuClicked);
    }
    

    const pressItemHandler = (idExpnd, boolExpnd)=>{
        //alert("you have pressed the item handler");
        let tempArr = srvrLst.map((item)=>{
            return item.SRV_ID==idExpnd?{...item, expand:boolExpnd}:item 
          });
          
          setSrvrLst(tempArr);
    }
    const editPressHandler = (item) => {
        console.log('editPressHandler')
        console.log(item);
        navigation.navigate('EditServer', {editItem: item});
    }

    const loadData = async() => {
        let url = svcUrl.webApiUrl+"/getsrvlist";
        let lst = await LoadGrid(url);
        if(lst != 'error')
        { 
            setSrvrLst(lst);
            //setIsLoading(false);
        }
    }

    const renderItems = (item)=>{
        return(
            <Card>
                {!item.expand && 

                    <View style={globalStyles.vwRow}>
                        <Text>{item.SRV_NAME}</Text>
                        <View style={globalStyles.vwRow}>
                            <Text>{item.IP}</Text>
                            <View style={{marginLeft:20,}}>
                                <MaterialIcons onPress={() => pressItemHandler(item.SRV_ID, true)}  name="keyboard-arrow-down" size={24} color="gray" />
                            </View>
                        </View>
                    </View>

                }

                {item.expand &&
                <View style={globalStyles.vwRow}>
                    <View style={{width:'95%'}}>
                        <View style={globalStyles.vwRow}>
                            <View style={{textAlign:'left'}}>
                                <Text style={globalStyles.gridTitle}>Sym</Text>
                                <Text>{item.SRV_NAME}</Text>
                            </View>
                            <View>
                                <Text style={globalStyles.gridTitle}>Name</Text>
                                <Text>{item.SRV_NAME}</Text>
                            </View>    
                        </View> 
                        <View style={globalStyles.vwRow}>
                            <View style={{textAlign:'left'}}>
                                <Text style={globalStyles.gridTitle}>IP Address</Text>
                                <Text>{item.IP}</Text>
                            </View>
                            <View>
                                <Text style={globalStyles.gridTitle}>Type</Text>
                                <Text>{item.Type}</Text>
                            </View>    
                        </View>
                        <View style={[globalStyles.vwTileText,{justifyContent:'center'}, globalStyles.vwMarginTwice]}>
                            <View style={[globalStyles.vwTileText,globalStyles.vwSubmenuHeader]}>
                                <TouchableOpacity onPress={() => editPressHandler(item)}>
                                    <MaterialIcons name="edit" size={20} color="#b80202" style={{marginVertical:5, marginHorizontal:5}} />
                                </TouchableOpacity>
                            </View>
                            <View style={[globalStyles.vwTileText,globalStyles.vwSubmenuHeader]}>
                                <MaterialIcons name="delete" size={20} color="#b80202" style={{marginVertical:5, marginHorizontal:5}} />
                            </View>
                            
                        </View>     
                    </View>
                    <View style={{width:'5%', alignItems:'flex-end', alignSelf:"flex-end"}}>
                        <TouchableOpacity onPress={() => pressItemHandler(item.SRV_ID, false)}>
                            <MaterialIcons name="keyboard-arrow-up" size={24} color='gray'  />
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </Card>
        )
    }

    return(
        <View style={globalStyles.container}>
            {/* <Header headerText='ServerNew' /> */}
            <View style={globalStyles.content}>
                {/* <View style={globalStyles.plusIconVw}>
                    <MaterialIcons onPress={() => navigation.navigate('AddServer')} name="add" size={20} color="#b80202" style={globalStyles.plusIcon}  />
                </View> */}
                <FlatList 
                data={srvrLst}
                renderItem={({item})=>(
                    renderItems(item)
                )}
               />
    
            </View>

            <FooterComponent />
        </View>
    )
}
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";
import { MaterialIcons } from '@expo/vector-icons';
import svcUrl from "../config/svcUrl";
import { LoadGrid } from "../shared/globalFunc";

export default function Bookmark({navigation}){
    const intBkmrkLst = [
        {
            id:1,
            cam: 'cam_58',
            date: '2/10/2022',
            evtDate: '1/20/2022',
            evtDesc: 'new description of camera of course',
            expand:false
        },
        {
            id:2,
            cam: 'cam_53',
            date: '2/10/2022',
            evtDate: '1/20/2022',
            evtDesc: 'new description of camera of course',
            expand:false
        },
        {
            id:3,
            cam: 'cam_5',
            date: '2/10/2022',
            evtDate: '1/20/2022',
            evtDesc: 'new gpp of camera of course',
            expand:false
        }
    ]

    const[bkmrkLst, setBkmrkLst] = useState([]);

    useEffect(()=>{
        loadData();
    },[])

    const loadData = async ()=>{
        let url = svcUrl.webApiUrl+"/getBookmarks";
        let lst = await LoadGrid(url);
        if(lst != 'error')
        { 
            setBkmrkLst(lst);
            //setIsLoading(false);
        }
    }

    const pressItemHandler = (idExpnd, boolExpnd) =>{
        let tempArr = bkmrkLst.map((item) =>{
            return item.Id==idExpnd?{...item, expand:boolExpnd}:item
        })
        setBkmrkLst(tempArr);
    }
    const editPressHandler = (item) =>{
       // alert(item.id);
       navigation.navigate('EdtBkmrk',{editItem:item})
    }

    const renderItems = (item) =>{
        return(
            <Card>
                
                {item.expand == false ? (
                    <View style={globalStyles.vwRow}>
                        <Text>{item.CAMID}</Text>
                        {/* <Text>{item.date}</Text> */}
                        <View style={globalStyles.vwRow}>
                            <Text>{item.DTBK}</Text>
                            <View style={{marginLeft:20,}}>
                                <MaterialIcons onPress={() => pressItemHandler(item.Id, true)}  name="keyboard-arrow-down" size={24} color="gray" />
                            </View>
                        </View>
                    </View>
                    ):(
                    <View style={globalStyles.vwRow}>
                        <View style={{width:'95%'}}>
                            <View style={globalStyles.vwRow}>
                                <View style={{textAlign:'left'}}>
                                    <Text style={globalStyles.gridTitle}>Date</Text>
                                    <Text>{item.DTBK}</Text>
                                </View>
                                <View>
                                    <Text style={globalStyles.gridTitle}>Camera</Text>
                                    <Text>{item.CAMID}</Text>
                                </View>  
                            </View>
                            <View style={globalStyles.vwRow}>
                                <View style={{textAlign:'left'}}>
                                    <Text style={globalStyles.gridTitle}>Event Date</Text>
                                    <Text>{item.DTRC}</Text>
                                </View>
                                <View>
                                    <Text style={globalStyles.gridTitle}>Description</Text>
                                    <Text>{item.BKDS}</Text>
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
                            <TouchableOpacity onPress={() => pressItemHandler(item.Id, false)}>
                                <MaterialIcons name="keyboard-arrow-up" size={24} color='gray'  />
                            </TouchableOpacity>
                        </View>
                    </View>
                    )
                }
            </Card>
        )
    }

    return(
        <View style={globalStyles.container}>
            <View style={globalStyles.content}>

                <FlatList
                    data={bkmrkLst}
                    renderItem={({item})=>(
                        renderItems(item)
                    )}
                />
            </View>

        </View>
    )
}
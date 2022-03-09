import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import FooterComponent from '../components/footer';
import Card from '../shared/cardTile';
import { globalStyles } from '../shared/global';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import EventMenuTopComponent from '../components/eventMenuTop';
import ModalComponent from '../shared/modal';
import svcUrl from '../config/svcUrl';
import { LoadGrid } from '../shared/globalFunc';

export default function Events(){
    const initEvtLst = [
        {id:1, date:'2/9/2022', type:'NVR 1', device:'http://172.17.6.47', user:'8001', status:'Ready', expand:false}
        ,        {id:2, date:'2/9/2022', type:'NVR 2', device:'http://172.17.6.47', user:'8001', status:'Ready', expand:false}
        ,        {id:3, date:'2/9/2022', type:'NVR 3', device:'http://172.17.6.47', user:'8001', status:'Ready', expand:false}
        ,        {id:4, date:'2/9/2022', type:'NVR 4', device:'http://172.17.6.47', user:'8001', status:'Ready', expand:false}
    ]
    const[eventLst, setEventLst] = useState([]);  
    const[isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        loadData();
    },[])

    const loadData = async() => {
        let url = svcUrl.webApiUrl+"/getAllAlert";
        let lst = await LoadGrid(url);
        if(lst != 'error')
        { 
            setEventLst(lst);
            //setIsLoading(false);
        }
    }

    const pressItemHandler = (idExpnd, boolExpnd) =>{
         let tempArr = eventLst.map((item)=>{
            return item.ID==idExpnd?{...item, expand:boolExpnd}:item 
          });
          setEventLst(tempArr);

    }

    const editPressHandler = (item) =>{
        alert(item.id)
    }


    const renderItems = (item)=>{
        return(
            <Card>
                {!item.expand && 
                    
                    <View style={globalStyles.vwRow}>

                        <Text>{item.EVTIME}</Text>
                        <View style={globalStyles.vwRow}>
                            <Text>{item.EVTYPE}</Text>
                            <View style={{marginLeft:20,}}>
                                <MaterialIcons onPress={() => pressItemHandler(item.ID, true)}  name="keyboard-arrow-down" size={24} color="gray" />
                            </View>
                        </View>
                    </View>

                }

                {item.expand &&
                <View style={globalStyles.vwRow}>
                    <View style={{width:'95%'}}>
                        <View style={globalStyles.vwRow}>
                            <View style={{textAlign:'left'}}>
                                <Text style={globalStyles.gridTitle}>Date</Text>
                                <Text>{item.EVTIME}</Text>
                            </View>
                            <View>
                                <Text style={globalStyles.gridTitle}>Type</Text>
                                <Text>{item.EVTYPE}</Text>
                            </View>    
                        </View> 
                        <View style={globalStyles.vwRow}>
                            <View style={{textAlign:'left'}}>
                                <Text style={globalStyles.gridTitle}>Device</Text>
                                <Text>{item.OBJIDS}</Text>
                            </View>
                            <View>
                                <Text style={globalStyles.gridTitle}>User</Text>
                                <Text>{item.USRASG}</Text>
                            </View>    
                        </View>
                        <View style={globalStyles.vwRow}>
                            <View style={{textAlign:'left'}}>
                                <Text style={globalStyles.gridTitle}>Status</Text>
                                <Text>{item.EVSTATE}</Text>
                            </View>
                                
                        </View>
                        {/* <View style={[globalStyles.vwTileText,{justifyContent:'center'}, globalStyles.vwMarginTwice]}>
                            <View style={[globalStyles.vwTileText,globalStyles.vwSubmenuHeader]}>
                                <TouchableOpacity onPress={() => editPressHandler(item)}>
                                    <MaterialIcons name="edit" size={20} color="#b80202" style={{marginVertical:5, marginHorizontal:5}} />
                                </TouchableOpacity>
                            </View>
                            <View style={[globalStyles.vwTileText,globalStyles.vwSubmenuHeader]}>
                                <MaterialIcons name="delete" size={20} color="#b80202" style={{marginVertical:5, marginHorizontal:5}} />
                            </View>
                            
                        </View>      */}
                    </View>
                    <View style={{width:'5%', alignItems:'flex-end', alignSelf:"flex-end"}}>
                        <TouchableOpacity onPress={() => pressItemHandler(item.ID, false)}>
                            <MaterialIcons name="keyboard-arrow-up" size={24} color='gray'  />
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </Card>
        )
    }

    const eventPress = (eventMenu) =>{
        //alert(eventMenu);
        setIsModalOpen(true);
    }
    const modalIconClose = ()=>{
        setIsModalOpen(false);
    }

    return(
        <View style={globalStyles.container}>
            <EventMenuTopComponent itemPress={eventPress} />
            <ModalComponent modalOpen={isModalOpen} modalIconClose={modalIconClose} />
            <View style={globalStyles.content}>

            <View style={{flex:1, marginVertical:6}}>
                <FlatList 
                    data={eventLst}
                    renderItem={({item})=>(
                        renderItems(item)
                    )}
                />
                </View>
            </View>
            <FooterComponent />
        </View>
    )
}
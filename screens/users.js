import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";
import { MaterialIcons } from '@expo/vector-icons';
import svcUrl from '../config/svcUrl';
import { LoadGrid, trimVal} from '../shared/globalFunc';

export default function Users({navigation}) {
    const initUsrsLst = [
        {
            ID: 1, LOGIN: 'adam', PASSWORD: 'adam', USRNAME: 'Adamp', GROUPID: 'Administrator',
            USREML: 'adam@polixel.pl', USRMOB: '889-9-', JOBDESC:'Jobs', expand: false
        }
       
    ];
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        loadData();
        //        alert(svcUrl.webApiUrl);
        //        alert("Users table effect");
    }, [])

    const pressItemHandler = (idExpnd, boolExpnd) => {
        let tempArr = users.map((item) => {
            return item.ID == idExpnd ? { ...item, expand: boolExpnd } : item
        })
        setUsers(tempArr);
    }

    const editPressHandler = (item) => {
        
        navigation.navigate('EdtUsr',{editItem: item})
    }

    const loadData = async() => {
        let url = "http://172.17.26.47:8011/m3snpr/device/getAllUsers"; //svcUrl.webApiUrl+"/getdevicelist/nvr1";
        //        http://172.17.26.47:8011/m3snpr/device/getdevicelist/nvr1
        let lst = await LoadGrid(url);
        if(lst != 'error')
        { 
            setUsers(lst);
       // console.log(userLst);
            setIsLoading(false);
        }
    }

    const renderItems = (item) => {
        return (
            <Card>
                {
                    item.expand == false ? (
                        <View style={globalStyles.vwRow}>
                            <Text>{item.LOGIN.trim()}</Text>
                            {/* <Text>{item.date}</Text> */}
                            <View style={globalStyles.vwRow}>
                                {/* <Text>{item.email}</Text> */}
                                <View style={{ marginLeft: 20, }}>
                                    <MaterialIcons onPress={() => pressItemHandler(item.ID, true)} name="keyboard-arrow-down" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={globalStyles.vwRow}>
                            <View style={{ width: '95%' }}>
                                <View style={globalStyles.vwRow}>
                                    <View style={{ textAlign: 'left' }}>
                                        <Text style={globalStyles.gridTitle}>Login</Text>
                                        <Text>{item.LOGIN.trim()}</Text>
                                    </View>
                                    <View>
                                        <Text style={globalStyles.gridTitle}>Username</Text>
                                        <Text>{trimVal(item.USRNAME)}</Text>
                                    </View>
                                </View>
                                <View style={globalStyles.vwRow}>
                                    <View style={{ textAlign: 'left' }}>
                                        <Text style={globalStyles.gridTitle}>Group</Text>
                                        <Text>{item.GROUPID}</Text>
                                    </View>
                                    <View>
                                        <Text style={globalStyles.gridTitle}>E-mail</Text>
                                        <Text>{trimVal(item.USREML)}</Text>
                                    </View>
                                </View>
                                <View style={globalStyles.vwRow}>
                                    <View style={{ textAlign: 'left' }}>
                                        <Text style={globalStyles.gridTitle}>Mobile</Text>
                                        <Text>{item.USRMOB.trim()}</Text>
                                    </View>
                                    {/* <View>
                                        <Text style={globalStyles.gridTitle}>Password Date</Text>
                                        <Text>{item.pwdDate}</Text>
                                    </View> */}
                                </View>
                                <View style={[globalStyles.vwTileText, { justifyContent: 'center' }, globalStyles.vwMarginTwice]}>
                                    <View style={[globalStyles.vwTileText, globalStyles.vwSubmenuHeader]}>
                                        <TouchableOpacity onPress={() => editPressHandler(item)}>
                                            <MaterialIcons name="edit" size={20} color="#b80202" style={{ marginVertical: 5, marginHorizontal: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[globalStyles.vwTileText, globalStyles.vwSubmenuHeader]}>
                                        <MaterialIcons name="delete" size={20} color="#b80202" style={{ marginVertical: 5, marginHorizontal: 5 }} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '5%', alignItems: 'flex-end', alignSelf: "flex-end" }}>
                                <TouchableOpacity onPress={() => pressItemHandler(item.ID, false)}>
                                    <MaterialIcons name="keyboard-arrow-up" size={24} color='gray' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </Card>
        )
    }
    return (
        <View style={globalStyles.container}>
            
                {isLoading ? (
                    <ActivityIndicator animating={isLoading} />
                ):(
                    <View style={globalStyles.content}>
                    <View style={globalStyles.plusIconVw}>
                        <MaterialIcons onPress={() => navigation.navigate('AddUsr')} name="add" size={20} color="#b80202" style={globalStyles.plusIcon}  />
                    </View>
                    <FlatList
                        data={users}
                        keyExtractor = {item => item.ID}
                        renderItem={({ item }) => (
                            renderItems(item)
                        )}
                    />
                                </View>
                    )
                }

        </View>
    )
}
import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList,TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import svcUrl from "../config/svcUrl";
import CardLnkTitle from "../shared/cardLnkTile";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";
import { LoadGrid, LoadGridComn } from "../shared/globalFunc";

export default function CamListComponent({selMap, selIndx, onPress}){
    const[camlst, setCamLst] = useState([
        {title:'Cam1', key:'1'},
        {title:'Cam 2', key: '2'},
        {title:'Cam 3', key:'3'},
        {title:'Cam 4', key:'4'},
        {title:'Cam 5', key:'5'},
        {title:'Cam 6', key:'6'},
        {title:'Cam7(Outsidecam)outsidethescope', key:'7'},
        {title:'Cam 8', key:'8'},
        {title:'Cam 9', key:'9'},
        {title:'Cam 10', key:'10'},
        {title:'Cam 11', key:'11'},
        {title:'Cam 12', key:'12'},
        {title:'Cam 13', key:'13'},
        {title:'Cam 14', key:'14'},
        {title:'Cam 15', key:'15'},
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        loadCamByMap(selMap);
    }, [selMap])

    const loadCamByMap = async (mapSym)=>{
      //  alert(mapSym.length);
        let url = svcUrl.webApiUrl + ((mapSym =='')?"/getAllCamera": ("/GetCamFromMap/" + mapSym));
        console.log(url);
        let lst = await LoadGridComn(url);
        if(lst != 'error')
        {
            if(mapSym == '')
            {
                lst = lst.map((item)=>{
                    return {Title:item.DEV_SYM, SubTitle:item.DEV_NAME}
                  });
            }
            else{
                console.log(lst);
                if(lst.data.length > 0)
                    lst = lst.data[0].DetailCollections;
                else
                    lst = [];
                console.log(lst);
            }
            setCamLst(lst);
            setIsLoading(false);
        }
    }

    const FlastlistItemSeparator = () => {
        return(
            <View style={{marginVertical:5, marginHorizontal:5}}>

            </View>
        )
    }

    const FlatlistHeader = ()=>{
        return(
            <View style={{margin:20}}>
                <Text>Showing camera of Map:</Text>
            </View>
        )
    }

    return(
        <View style={{ backgroundColor:'#fff', marginVertical:10, height:280}}>
            {
                isLoading?(
                    <ActivityIndicator size="large" style={globalStyles.containerPagePadding} />
                ):
                (
                    
                        (camlst.length) < 1?
                        (
                            <View style={globalStyles.containerPage}>
                                <Text>No camera present</Text>
                            </View>
                        )
                        :
                        (
                            <FlatList
                            // ItemSeparatorComponent={FlastlistItemSeparator}
                            data={camlst}
                            numColumns={2}
                            renderItem={({item})=>(
                                    <CardLnkTitle>
                                        <TouchableOpacity onPress={() => onPress(item.Title, selIndx)}>
                                            <Text style={globalStyles.lnkText}>{item.SubTitle}</Text>
                                        </TouchableOpacity>
                                    </CardLnkTitle>
                                
                            )}
                        />
    

                        )
                    
                )
            }
        </View>
    )
}
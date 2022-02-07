import React,{useState} from "react";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from "react-native";
import CardLnkTitle from "../shared/cardLnkTile";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";

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
        <View style={{ backgroundColor:'#fff', marginVertical:10}}>

        <FlatList
            // ItemSeparatorComponent={FlastlistItemSeparator}
            numColumns={2}
            data={camlst}
            renderItem={({item})=>(
                    <CardLnkTitle>
                        <TouchableOpacity onPress={() => onPress(item.title, selIndx)}>
                            <Text style={globalStyles.lnkText}>{item.title}</Text>
                        </TouchableOpacity>
                    </CardLnkTitle>
                
            )}
        />
        </View>
    )
}
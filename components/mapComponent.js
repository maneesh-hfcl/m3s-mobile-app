import React, {useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CardGrid from "../shared/cardGrid";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";

export default function MapComponent({onPress}){
    const[maplst, setMapLst] = useState([
        {title:'Map1', key:'1'},
        {title:'Map 2', key: '2'},
        {title:'Map 3', key:'3'},
        {title:'Sector 32', key:'4'},
        {title:'Delhi', key:'5'},
        {title:'Zara', key:'6'},
        {title:'Bangalore Map', key:'7'},
        {title:'New Map', key:'8'},
        {title:'Old Map', key:'9'},
        {title:'Unknown Loc', key:'10'},
        {title:'Old Map 1', key:'11'},
        {title:'Old Map 2', key:'12'},
        {title:'Old Map 3', key:'13'},
        {title:'Old Map 4', key:'14'},
        {title:'Old Map 5', key:'15'},
    ]);
    
    return(
            <View style={{ flex: 1, width: '100%' }}>
                <FlatList 
                    data={maplst}
                    horizontal={true}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={() => onPress(item.title)}> 
                            <CardGrid type=''>  
                                <Text>{item.title}</Text>
                            </CardGrid>
                        </TouchableOpacity>
                    )}
                />
            </View>
                
        
    )
}
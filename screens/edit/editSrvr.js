import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';

import CustButton from "../../shared/CustButton";
import { globalStyles } from "../../shared/global";

export default function EditSrvr({route, navigation}){
    const {editItem} = route.params;
    const[inputVals, setInputVals] = useState(editItem);

    useEffect(()=>{
        console.log('useEffect')
        console.log(editItem);
    },[]
    )

    const pressHandler = () => {
        console.log(inputVals);
    }
    return(
        <View style={[styles.containerPage, globalStyles.container ]}>
            <Text style={globalStyles.text}>Sym</Text>
            <TextInput value={inputVals.sym} 
                onChangeText={(value) => setInputVals({...inputVals, sym: value})} 
                style={globalStyles.inputLogin} />
            <Text style={globalStyles.text}>Name</Text>
            <TextInput value={inputVals.name} 
                onChangeText={(value) => setInputVals({...inputVals, name: value})}
            style={globalStyles.inputLogin} />

            <Text style={globalStyles.text}>IP Address</Text>
            <TextInput 
                value={inputVals.ipAdd}
                onChangeText={(value) => setInputVals({...inputVals, ipAdd: value})}
            style={globalStyles.inputLogin} />

            {/* <Text style={globalStyles.text}>Port</Text>
            <TextInput style={globalStyles.inputLogin} /> */}

            <Text style={globalStyles.text}>Type</Text>
            <TextInput 
                value={inputVals.type}
                onChangeText={(value) => setInputVals({...inputVals, type:value}) }
            style={globalStyles.inputLogin} />

            <View style={globalStyles.vwMarginOnly}>
                <CustButton text='Save' onPress={pressHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPage:{
        padding:20
    }
})

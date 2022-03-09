import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
//import { Picker } from "@react-native-picker/picker";
import CustButton from "../../shared/CustButton";
import { globalStyles } from "../../shared/global";
import { Formik } from "formik";
import * as yup from 'yup';
import { Picker } from "@react-native-picker/picker";
import CardPicker from "../../shared/cardPicker";
import { ScrollView } from "react-native-gesture-handler";

export default function AddSrvr(){
//    const {editItem} = route.params;
    const[inputVals, setInputVals] =useState({
        sym:'',
        name: '',
        ipAdd: '',
        status: '',
        type: ''
    });

    const initValues = {
        sym:'',
        name: '',
        ipAddr: '',
        port:80,
        extIpAddr: '',
        extPort: 80,
        type:'',
        status:'',
        connection:'',
        checkAlive:''
    }

    const selLstType = [
        {id:1, value:'Undefined'},
        {id:2, value:'VMS'},
        {id:3, value:'Video decoder'}
    ]

    const selLstStatus = [
       {id:1, value:'Operational'},
        {id:2, value:'Ready to use'},
        {id:3, value:'Maintenance'},
        {id:4, value:'Malfunction'},
        {id:5, value:'Not used'},
    ]
    const selLstConnection = [
        {id:1, value:'Local network'},
         {id:2, value:'Leased line'},
         {id:3, value:'ATM Network'}
     ]


    useEffect(()=>{
        console.log('useEffect')
        console.log(inputVals);
    },[]
    )

    const pressHandler = () => {
        console.log(inputVals);
    }

    return(
        <Formik
            initialValues={initValues}
            onSubmit={(values) =>{
                console.log(values)
            }}
        >
            {
                (formikProps) => (
                <View style={[styles.containerPage, globalStyles.container ]}>
                    <ScrollView>
                    <Text style={globalStyles.text}>Sym</Text>
                    <TextInput value={formikProps.values.sym} 
                        onChangeText={formikProps.handleChange('sym')}
                        onBlur={formikProps.handleBlur('sym')}
                        style={globalStyles.inputLogin} />

                    <Text style={globalStyles.text}>Name</Text>
                    <TextInput value={formikProps.values.name} 
                        onChangeText={formikProps.handleChange('name')}
                        onBlur={formikProps.handleBlur('name')}
                    style={globalStyles.inputLogin} />
        
                    <Text style={globalStyles.text}>IP Address</Text>
                    <TextInput 
                        value={formikProps.values.ipAddr}
                        onChangeText={formikProps.handleChange('ipAddr')}
                        onBlur={formikProps.handleBlur('ipAddr')}
                    style={globalStyles.inputLogin} />

                    <Text style={globalStyles.text}>Port</Text>
                    <TextInput 
                        value={formikProps.values.port}
                        onChangeText={formikProps.handleChange('port')}
                        onBlur={formikProps.handleBlur('port')}
                    style={globalStyles.inputLogin} />

                    <Text style={globalStyles.text}>External IP Address</Text>
                    <TextInput 
                        value={formikProps.values.extIpAddr}
                        onChangeText={formikProps.handleChange('extIpAddr')}
                        onBlur={formikProps.handleBlur('extIpAddr')}
                    style={globalStyles.inputLogin} />

                    <Text style={globalStyles.text}>External Port</Text>
                    <TextInput 
                        value={formikProps.values.extPort}
                        onChangeText={formikProps.handleChange('extPort')}
                        onBlur={formikProps.handleBlur('extPort')}
                    style={globalStyles.inputLogin} />
        
                    <Text style={globalStyles.text}>Type</Text>
                    <Picker
                        style={globalStyles.inputLogin}
                        selectedValue={formikProps.values.type}
                        onValueChange={formikProps.handleChange('type')}
                    >
                        <CardPicker selLst={selLstType} />
                    </Picker>

                    <Text style={globalStyles.text}>Status</Text>
                    <Picker
                        style={globalStyles.inputLogin}
                        selectedValue={formikProps.values.status}
                        onValueChange={formikProps.handleChange('status')}
                    >
                        <CardPicker selLst={selLstStatus} />
                    </Picker>

                    <Text style={globalStyles.text}>Connection</Text>
                    <Picker
                        style={globalStyles.inputLogin}
                        selectedValue={formikProps.values.connection}
                        onValueChange={formikProps.handleChange('connection')}
                    >
                        <CardPicker selLst={selLstConnection} />
                    </Picker>
 
                    <Text style={globalStyles.text}>Check Alive Delay</Text>
                    <TextInput style={globalStyles.inputLogin}
                        value={formikProps.values.checkAlive}
                        onChangeText={formikProps.handleChange('checkAlive')}
                        onBlur={formikProps.handleBlur('checkAlive')}
                    />

                    <View style={globalStyles.vwMarginOnly}>
                        <CustButton text='Save' onPress={formikProps.handleSubmit} />
                    </View>
                    </ScrollView>
                </View>
                )
            }
        </Formik>

    )
}

const styles = StyleSheet.create({
    containerPage:{
        padding:20
    }
})

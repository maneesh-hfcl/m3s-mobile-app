import React from "react";
import {View, Text, TextInput,  TouchableWithoutFeedback, Keyboard} from 'react-native';
import {} from 'formik'
import { globalStyles } from "../../shared/global";
import CustButton from "../../shared/CustButton";
import { Formik } from "formik";
import * as yup from 'yup';
import { Picker } from "@react-native-picker/picker";
import CardPicker from "../../shared/cardPicker";

const schema = yup.object({
    sym:yup.string()
        .required('*'),
    name: yup.string()
        .required('*')
}) 

export default function AddWrkstn(){
    const handleSubmit =()=>{
        console.log("you have presssed the button");
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

    return(
        <Formik
            initialValues={{
                sym: '',
                name:'',
                ipAddr:'',
                port:'80',
                type:'',
                status:''

            }}
            onSubmit={
                (values) => {
                    console.log(values)
                }
            }
            validationSchema={schema}
        >
            {
                (formikProps)=>(
                    <TouchableWithoutFeedback>
                        <View style={[globalStyles.container, globalStyles.containerPagePadding]}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={globalStyles.text}>Symbol</Text>
                                <Text style={globalStyles.error} >{formikProps.touched.sym && formikProps.errors.sym}</Text>
                            </View>
                            <TextInput style={globalStyles.inputLogin} 
                            value={formikProps.values.sym}
                            onBlur={formikProps.handleBlur('sym')}
                            onChangeText={formikProps.handleChange('sym')}
                            placeholder="Enter symbol" />
                            

                            <Text style={globalStyles.text}>VMS Station Name</Text>
                            <TextInput style={globalStyles.inputLogin} 
                            onChangeText={formikProps.handleChange('name')}
                            onBlur={formikProps.handleBlur('name')}
                            value={formikProps.values.name} placeholder="Enter VMS Station Name" />
                            <Text style={globalStyles.error}>{formikProps.touched.name && formikProps.errors.name}</Text>

                            <Text style={globalStyles.text}>IP Address</Text>
                            <TextInput style={globalStyles.inputLogin} 
                            value={formikProps.values.ipAddr}
                            onChangeText={formikProps.handleChange('ipAddr')}
                            placeholder="Enter IP Address" />
                            
                            <Text style={globalStyles.text}>Port</Text>
                            <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.port}
                            onChangeText={formikProps.handleChange('port')}
                            keyboardType="numeric"
                        
                            placeholder="8080" />

                            <Text style={globalStyles.text}>Type</Text>
                            {/* <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.type}
                            onChangeText={formikProps.handleChange('type')}
                            placeholder="Type" /> */}

                            <Picker
                                selectedValue={formikProps.values.type}
                                onValueChange={formikProps.handleChange('type')}
                                style={globalStyles.inputLogin}
                            >
                               <CardPicker selLst={selLstType} />
                            </Picker>

                            <Text style={globalStyles.text}> Status</Text>
                            <Picker
                                style={globalStyles.inputLogin}
                                selectedValue={formikProps.values.status}
                                onValueChange={formikProps.handleChange('status')}
                            >
                                <CardPicker selLst={selLstStatus} />
                            </Picker>
            
                            <View style={globalStyles.vwMarginOnly}>
                                <CustButton text='Save' onPress={formikProps.handleSubmit} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }

        </Formik>
    )
}
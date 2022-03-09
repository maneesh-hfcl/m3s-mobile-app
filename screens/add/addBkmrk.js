import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { Formik } from "formik";
import { globalStyles } from "../../shared/global";
import { TextInput } from "react-native-gesture-handler";
import CustButton from "../../shared/CustButton";

export default function AddBkmrk(){
    const initValues = {
        date:'',
        cam:'',
        evtDt:'',
        desc:''
    }

    return(
        <Formik
            initialValues={initValues}
            onSubmit={(values) =>{
                console.log(values)
            }}
        >
            {
                (formikProps)=>(
                    <View style={[globalStyles.container, globalStyles.containerPagePadding]}>
                        <Text style={globalStyles.text}>Date</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.date}
                            onChangeText = {formikProps.handleChange('date')}
                            onBlur ={formikProps.handleBlur('date')}
                        />

                        <Text style={globalStyles.text}>Camera</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.cam}
                            onChangeText = {formikProps.handleChange('cam')}
                            onBlur ={formikProps.handleBlur('cam')}
                        />

                        <Text style={globalStyles.text}>Event date</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.evtDt}
                            onChangeText = {formikProps.handleChange('evtDt')}
                            onBlur ={formikProps.handleBlur('evtDt')}
                        />

                        <Text style={globalStyles.text}>Description</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.desc}
                            onChangeText = {formikProps.handleChange('desc')}
                            onBlur ={formikProps.handleBlur('desc')}
                        />

                        <View style={globalStyles.vwMarginOnly}>
                            <CustButton text='Save' onPress={formikProps.handleSubmit} />
                        </View>

                    </View>
                )
            }
        </Formik> 

    )
}
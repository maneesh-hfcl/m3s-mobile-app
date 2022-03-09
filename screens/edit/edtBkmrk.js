import { Formik } from "formik";
import React from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import CustButton from "../../shared/CustButton";
import { globalStyles } from "../../shared/global";

export default function EdtBkmrk({navigation, route}){
    const {editItem} = route.params;
    
    const initValues = {
        id:0,
        date:'',
        cam:'',
        evtDate:'',
        evtDesc:''
    }

    return(
        <Formik
            initialValues={editItem}
            onSubmit={(values)=>{
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
                            value={formikProps.values.evtDate}
                            onChangeText = {formikProps.handleChange('evtDate')}
                            onBlur ={formikProps.handleBlur('evtDate')}
                        />

                        <Text style={globalStyles.text}>Description</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.evtDesc}
                            onChangeText = {formikProps.handleChange('evtDesc')}
                            onBlur ={formikProps.handleBlur('evtDesc')}
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

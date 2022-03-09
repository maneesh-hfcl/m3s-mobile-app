import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { Formik } from "formik";
import { globalStyles } from "../../shared/global";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CustButton from "../../shared/CustButton";
import * as yup from 'yup'

const schema = yup.object({
    login:yup.string()
            .required('*')
})

export default function AddUsr(){
    const initValues= {
        login:'',
        usrname:'',
        jobdesc: '',
        group:0,
        email:'',
        phone:'',
        mobile:''
    }

    return(
        <Formik
            initialValues={initValues}
            onSubmit={(values)=>{
                console.log(values);
            }}
            validationSchema={schema}
        >
        {
            (formikProps)=>(
                <View style={[globalStyles.container, globalStyles.containerPage]}>
                    <ScrollView>
                        <Text style={globalStyles.text}>Login</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.login}
                            onChangeText={formikProps.handleChange('login')}
                            onBlur={formikProps.handleBlur('login')}
                        />
                        <Text style={globalStyles.error} >{formikProps.touched && formikProps.errors.login}</Text>

                        <Text style={globalStyles.text}>Username</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.usrname}
                            onChangeText={formikProps.handleChange('usrname')}
                            onBlur={formikProps.handleBlur('usrname')}
                        />

                        <Text style={globalStyles.text}>Job description</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.jobdesc}
                            onChangeText={formikProps.handleChange('jobdesc')}
                            onBlur={formikProps.handleBlur('jobdesc')}
                        />

                        <Text style={globalStyles.text}>Group</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.group}
                            onChangeText={formikProps.handleChange('group')}
                            onBlur={formikProps.handleBlur('group')}
                        />

                        <Text style={globalStyles.text}>Email</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.email}
                            onChangeText={formikProps.handleChange('email')}
                            onBlur={formikProps.handleBlur('email')}
                        />

                        <Text style={globalStyles.text}>Phone</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.phone}
                            onChangeText={formikProps.handleChange('phone')}
                            onBlur={formikProps.handleBlur('phone')}
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

})
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../../shared/global';
import CustButton from '../../shared/CustButton';

export default function EditUsr({route}) {
    const {editItem} = route.params;
    
    useEffect(()=>{ 
       // editItem.JOBDESC = 'Job description';
        console.log(editItem);
    })

    return (
        <Formik
            initialValues={editItem}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {
                (formikProps) => (
<View style={[globalStyles.container, globalStyles.containerPage]}>
                    <ScrollView>
                        <Text style={globalStyles.text}>Login</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.LOGIN}
                            onChangeText={formikProps.handleChange('LOGIN')}
                            onBlur={formikProps.handleBlur('LOGIN')}
                        />
                        <Text style={globalStyles.error} >{formikProps.touched && formikProps.errors.LOGIN}</Text>

                        <Text style={globalStyles.text}>Username</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.USRNAME}
                            onChangeText={formikProps.handleChange('USRNAME')}
                            onBlur={formikProps.handleBlur('USRNAME')}
                        />

                        <Text style={globalStyles.text}>Job description</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.JOBDESC}
                            onChangeText={formikProps.handleChange('JOBDESC')}
                            onBlur={formikProps.handleBlur('JOBDESC')}
                        />

                        <Text style={globalStyles.text}>Group</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.GROUPID}
                            onChangeText={formikProps.handleChange('GROUPID')}
                            onBlur={formikProps.handleBlur('GROUPID')}
                        />

                        <Text style={globalStyles.text}>Email</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.USREML}
                            onChangeText={formikProps.handleChange('USREML')}
                            onBlur={formikProps.handleBlur('USREML')}
                        />

                        <Text style={globalStyles.text}>Phone</Text>
                        <TextInput style={globalStyles.inputLogin}
                            value={formikProps.values.USRMOB}
                            onChangeText={formikProps.handleChange('USRMOB')}
                            onBlur={formikProps.handleBlur('USRMOB')}
                        />
                        
                        <View style={globalStyles.vwMarginOnly}>
                            <CustButton text='Save' onPress={formikProps.handleSubmit} />
                        </View>
                    </ScrollView>
                </View>
                )
            }

        </Formik>

    );
}

const styles = StyleSheet.create({});

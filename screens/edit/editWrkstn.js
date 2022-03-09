import React, { useEffect } from 'react';
import {View, Text, TextInput} from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../shared/global';
import CustButton from '../../shared/CustButton';
import { Picker } from "@react-native-picker/picker";
import CardPicker from "../../shared/cardPicker";


function EditWrkstn({route, navigation}) {
    const {editItem} = route.params;
    useEffect(()=>{
        console.log(editItem);
    });

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
      initialValues={editItem}
    >
      {
        (formikProps) => (
              <View style={[globalStyles.container, globalStyles.containerPagePadding]}>
                    <Text style={globalStyles.text}>Name</Text>
                    
                    <TextInput style={globalStyles.inputLogin} 
                    value={formikProps.values.DEV_NAME}
                    onBlur={formikProps.handleBlur('DEV_NAME')}
                    onChangeText={formikProps.handleChange('DEV_NAME')}
                    placeholder="Enter symbol" />
                    

                    <Text style={globalStyles.text}>Description</Text>
                    <TextInput style={globalStyles.inputLogin} 
                    onChangeText={formikProps.handleChange('DEV_NAME')}
                    onBlur={formikProps.handleBlur('DEV_NAME')}
                    value={formikProps.values.DEV_NAME} 
                    placeholder="Enter VMS Station Name" />

                    <Text style={globalStyles.error}>{formikProps.touched.name && formikProps.errors.DEV_NAME}</Text>

                    <Text style={globalStyles.text}>IP Address</Text>
                    <TextInput style={globalStyles.inputLogin} 
                    value={formikProps.values.IP}
                    onChangeText={formikProps.handleChange('IP')}
                    onBlur={formikProps.handleBlur('IP')}
                    placeholder="Enter IP Address" />
                    
                    <Text style={globalStyles.text}>Port</Text>
                    <TextInput style={globalStyles.inputLogin}
                    value={formikProps.values.PORT}
                    onChangeText={formikProps.handleChange('PORT')}
                    onBlur={formikProps.handleBlur('PORT')}
                    keyboardType="numeric"
                
                    placeholder="8080" />

                    <Text style={globalStyles.text}>Type</Text>
                    {/* <TextInput style={globalStyles.inputLogin}
                    value={formikProps.values.type}
                    onChangeText={formikProps.handleChange('type')}
                    placeholder="Type" /> */}

                    <Picker
                        selectedValue={formikProps.values.DEV_TYPE}
                        onValueChange={formikProps.handleChange('DEV_TYPE')}
                        onBlur={formikProps.handleBlur('DEV_TYPE')}
                        style={globalStyles.inputLogin}
                    >
                        <CardPicker selLst={selLstType} />
                    </Picker>

                    <Text style={globalStyles.text}> Status</Text>
                    <Picker
                        style={globalStyles.inputLogin}
                        selectedValue={formikProps.values.STAT}
                        onValueChange={formikProps.handleChange('STAT')}
                        onBlur={formikProps.handleBlur('STAT')}
                    >
                        <CardPicker selLst={selLstStatus} />
                    </Picker>
    
                    <View style={globalStyles.vwMarginOnly}>
                        <CustButton text='Save' onPress={formikProps.handleSubmit} />
                    </View>
                </View>
        )
      }
    </Formik>

  )
}

export default EditWrkstn;

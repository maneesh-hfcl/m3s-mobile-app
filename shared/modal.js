import React from "react";
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "./global";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustButton from "./CustButton";

export default function ModalComponent({modalOpen, modalIconClose}){
    return(
        <Modal
            transparent={true}
            visible={modalOpen}
            style={[globalStyles.modalContent, globalStyles.modalContainer]}
        >
            <View style={styles.modalContainer}>
                    
                <View style={[globalStyles.headerTitle, globalStyles.vwRow]}>
                    <Text style={{fontSize:20, color:'#89c2d9'}}>
                        Confirm event
                    </Text>
                    <MaterialIcons
                            name='close'
                            size={20}
                            color="#b80202"
                            style={globalStyles.modalClose}
                            onPress={modalIconClose}
                        />
                </View>
                <View style={globalStyles.content}>
                    <Text style={[globalStyles.text]}>Add note</Text>
                    <TextInput 
                        multiline={true}
                        style={[globalStyles.inputLogin, {height:100, backgroundColor:'#fff'}]}
                    />
                    <Button title="Add" />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'#dedede',
        width:'80%',
        margin:'10%',
        marginTop:'30%',
        padding:20,
        paddingTop:5,
        borderWidth:1,
        borderRadius:5,
    }
})
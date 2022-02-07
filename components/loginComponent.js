import React,{useEffect} from "react";
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import CustButton from "../shared/CustButton";
import { globalStyles } from "../shared/global";
import {MCmdMgr} from "../jsPlayer/script";

export default function LoginComponent({navigation}){
    const pressHandler = ()=>{
        //alert("You have clicked the button press");
        navigation.navigate("Home");
      //  let cwd = CWndMngr2({name: 'Manoj'});
//        CWndMngr2.RunPlayer();
//        cwd.RunPlayer();
        
       // MCmdMgr();
       // console.log(cwd);
    }

//     useEffect(()=>{
//         //alert('You have called this function on screen load');
//         var ws = new WebSocket('ws://172.17.26.47:7008');

// ws.onopen = () => {
//   // connection opened
//   console.log('connection opened')
//   ws.send(
//       'FjbKHUNFrJGvd20ospNjJH9wjbDvbuTv400DRakxGnZthvmkMguazvxwoYgtV6IKMZ/ukrG5QDU23KDdlQrLc5xOf1lRD6Wbv/ogwXeO+/o='
//       ); 
//   // send a message
// };

// ws.onmessage = (e) => {
//   // a message was received
//   console.log(e.data);
// };

// ws.onerror = (e) => {
//   // an error occurred
//   console.log(e.message);
// };

// ws.onclose = (e) => {
//   // connection closed
//   console.log('closing connection');
//   console.log(e.code, e.reason);
// };
//     },[])


    return(
        <View style={styles.container}>
            <Text style={globalStyles.text}>Username</Text>
            <TextInput style={globalStyles.inputLogin} />
            <Text style={globalStyles.text}>Password</Text>
            <TextInput style={globalStyles.inputLogin} />
            <View style={globalStyles.vwMarginOnly}>
                <CustButton text='Sign in' onPress={pressHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:50
    }
})
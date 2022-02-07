import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { globalStyles } from "../shared/global";
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RecordingBar(){
    const initialState = 6;
    const [date, setDate] = useState(new Date(1598051730000));
    const[showDate, setShowDate] = useState(false);

    const initialRecrdArr =[
        {
            starTime:'4:00',
            endTime:'8:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'9:00',
            endTime:'11:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'12:00',
            endTime:'14:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'15:00',
            endTime:'23:00',
            duration: 4.5,
            startX:0,
            endX:0
        }
    ]
    const[totBar, setTotBar] = useState(initialState);
    const[totBarRecrdng, setTotBarRecrdng] = useState(2);
    const[recrdArr, setRecrdArr] = useState(initialRecrdArr);

    useEffect(()=>{
        //alert('You have called this function on screen load');
        calcXYPos();
    },[])

    const calcXYPos = () =>{
        let tempArr = recrdArr.map((elem) =>
            {
                return {...elem, startX:calcX(elem.starTime), endX:calcX(elem.endTime)}
            }
        );

        console.log(tempArr);
        setRecrdArr(tempArr);
    }

    const calcX = (timeVal) =>{
        let secondsInVal = calcSeconds(timeVal);
        let width = 150;
        let rangeEachWidth = 24/totBar
        let totWidth = width*totBar;
        let totSecondsInDay = 24*60*60;
        let startX = secondsInVal*totWidth/totSecondsInDay;
        console.log(secondsInVal + '::' + totWidth + '::' + startX +'::' + totSecondsInDay);
        return startX;
    }

    const calcSeconds = (timeVal) =>{
        let splitTime = timeVal.split(':');
        if(splitTime.length == 2)
        {
            return splitTime[0]*60*60 + splitTime[1]*60
        }
        else
            return splitTime[0]*60*60 + splitTime[1]*60 + splitTime[2]*1
    }

    const onChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        //alert("onchange called");
        setShowDate(false);
//        alert(showDate);
    }

    return(
        <View style={{ marginHorizontal:8, paddingBottom:8,backgroundColor:'black'}}>
            <View style={globalStyles.vwRow}>
                <Text style={styles.vwBarScaleText}>Camera</Text>
                <View>
                    <MaterialIcons name="date-range" size={24} color="#eee" onPress={(currentMode) => setShowDate(true)} />
               </View>

                {showDate && 
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                }
            </View>
        <ScrollView horizontal={true} style={{ backgroundColor:'', paddingBottom:5}}>
            <View style={{backgroundColor:'black', marginHorizontal:5}}>
                <View style={{flexDirection:'row', marginTop:2}}>
                {
                    
                    [...Array(totBar)].map((value, indx) =>

                        <View style={[styles.vwBarScale,(indx == 0)?styles.borderLeftOnly:'']} key={indx}>
                            <Text style={styles.vwBarScaleText}>{indx*(24/totBar)}</Text>
                            {
                                (indx == totBar-1)?(
                                    <Text style={[styles.vwBarScaleText,{right:0, position:'absolute'}]}>{(indx+1)*(24/totBar)}</Text>
                                ):(
                                    <Text></Text>
                                )
                            }
                        </View>    
                    )

                }
                </View>
                <View style={{flexDirection:'row'}}>
                {
                    
                    [...Array(totBar)].map((value, indx) =>
                        <View style={[styles.vwBar,(indx == 0)?styles.borderLeftOnly:'']} key={indx}>
                            
                        </View>    
                    )

                }
                </View>

                <View style={{flex:1, position:'absolute', top:22, zIndex:1, backgroundColor:'black'}}>
                {
                    // <View style={[styles.vwRecordingBar,{width:200, left:200}]}>
                    // </View>
                    recrdArr.map((item, indx) =>
                        <View style={[styles.vwRecordingBar,{left:item.startX, width:(item.endX - item.startX)}]} key={indx}>
                            
                        </View>    
                    )

                }
                </View>
            </View>

        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    vwBar:{
        borderStyle:'solid',
        
        borderColor:'gray',
        height:10,
        color:'#eee',
        width:150,
        borderRightWidth:1,
        borderBottomWidth:1,
        backgroundColor:'#454545',
        borderWidth:0,
        
    },
    vwBarScale:{
        borderStyle:'solid',
        backgroundColor:'transparent',
        borderColor:'gray',
        borderWidth:1,
        height:20,
        color:'#eee',
        width:150,

    },
    vwBarScaleText:{
        marginHorizontal:5, 
        color:'gray',
        fontSize:12,
        fontWeight:'bold'
    },
    card:{
        width:100,
        margin:10,
        borderWidth:1
    },
    borderLeftOnly:{
        borderLeftWidth:1,
    },
    vwRecordingBar:{
        borderStyle:'solid',
        position:'absolute',      
        borderColor:'#e9e9e9',
        height:8,
        
            color:'red',
  
        backgroundColor:'#55f520',
        
        
    }

})
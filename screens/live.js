import React,{useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Header from "../components/header";
import Card from "../shared/cardTile";
import { globalStyles } from "../shared/global";
import { Video } from "expo-av";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-web";
import Maps from "../components/mapComponent";
import MapComponent from "../components/mapComponent";
import CamListComponent from "../components/camlistComponent";
import CardSelCam from "../shared/cardSelCam";
import RecordingBar from "../components/recordingBar";
import FooterComponent from "../components/footer";
import CardGrid from "../shared/cardGrid";
import globalColor from "../shared/globalColor";

export default function LiveScreen({navigation}){
    const video = React.useRef(null);
    const[tileSize, setTileSize] = useState([
        {
            tileIndx: 0,
            camName:'Select'
        }
    ]);
    const[modalOpen, setModalOpen] = useState(false);
    const[selMap, setSelMap]=useState('');
    const[selIndxCam, setSelIndxCam] = useState(0);
    

    const changeTile = (size)=>{
        //alert(size);
        console.log(`Before ${tileSize.length}`);
        for(let iLoop = 0; iLoop < size*size; iLoop ++)
        {

        }
        setTileSize(prevTileSize => [...prevTileSize,{
            tileIndx:prevTileSize.length,
            camName:'Select'
        }])
        console.log(tileSize.length);
    }

    const mapPressHandler = (map)=>{
        //alert(map.MAPSYM);

        setSelMap(map.Id);
//        alert('You have pressed the map button' + mapCam);
    }

    const mapPressHandlerAll = () =>{
        setSelMap('');
    }

    const openSelCam = (indx)=>{
//        alert(`open the camera: ${indx}`)
        setSelIndxCam(indx);
        setModalOpen(true);
    }

    const camPressHandler = (cam, indx)=>{
        //alert(cam);
        let tempArr = tileSize.map((item)=>{
          return item.tileIndx==indx?{...item, camName:cam}:item 
        });
        
        setTileSize(tempArr);
        setModalOpen(false);
    }

    const deSeleCam = (selCam)=>{
        let tempArr = tileSize.filter((item)=> item != selCam);
          
        setTileSize(tempArr);
    }
    const showCamRec = (selCam)=>{
       // alert(selCam.camName);
    }
    const pressCardSelHandler = (indx) =>{
      setSelIndxCam(indx);
      
    }

    return(
        <View style={globalStyles.container}>
            {/* <Header headerText="Camera viewing" /> */}
            <View style={globalStyles.content}>
                <View style={styles.vwTileText}>
                    {/* <Card>
                        <TouchableOpacity onPress={() => changeTile(1)}>
                            <Text>1x1</Text>
                        </TouchableOpacity>
                    </Card>
                    <Card>
                        <TouchableOpacity onPress={() => changeTile(2)}>
                            <Text>2x2</Text>
                        </TouchableOpacity>
                    </Card> */}
                    {/* <TouchableOpacity onPress={() => changeTile(1)}>
                        <MaterialIcons name="add-circle" size={32} color="#b80202" style={{marginVertical:5, marginHorizontal:10}} />
                    </TouchableOpacity> */}


                </View>

                <View style={styles.vwTileContainer}>
                    {
                        tileSize.map((elem, index) =>(
                            <View style={{flexBasis:'48%', flex:1, borderColor:'#e9e9e9', borderWidth:1, margin:2}} key={index}>
                                 <Video  
                                    type="application/x-mpegURL"                                  
                                    style={styles.video}
                                    source={{
                                    uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8'
                                    }}

                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping

                                />




                            </View>
                        ))
                    }
                    
                    
                </View>
                
            </View>

            <Modal
                transparent={false}
                visible={modalOpen}
                style={globalStyles.modal}
            >
                <View style={globalStyles.modalContent}>
                    <MaterialIcons
                            name='close'
                            size={30}
                            color={globalColor.LightGray}
                            
                            onPress={() => setModalOpen(false)}
                            style={globalStyles.modalClose}
                        />
                    <View style={styles.vwTileText}>
                        <CardGrid type='header'>
                            <TouchableOpacity onPress={mapPressHandlerAll}>
                                <Text style={{color:'#fff',fontSize:15}}>All cameras</Text>
                            </TouchableOpacity>
                        </CardGrid>
                        <MapComponent onPress={mapPressHandler} />
                        
                        {/* <Card>
                            <TouchableOpacity onPress={() => changeTile(2)}>
                                <Text>Map</Text>
                            </TouchableOpacity>
                        </Card> */}
                    </View>
                    <View style={[globalStyles.vwMarginOnly, styles.vwCamList]}>
                        <CamListComponent selMap={selMap} selIndx={selIndxCam} onPress={camPressHandler} />
                    </View>
                </View>
            </Modal>

            <View style={[{flexDirection:"row",flexWrap:"wrap"}, globalStyles.vwBottom]}>
                    {
                        tileSize.map((elem, index) =>(
                            <View style={{flexBasis:'50%', flex:1}} key={index}>
                                <CardSelCam  selectedCam={(elem.tileIndx == selIndxCam)?true:false}
                                >
                                    <TouchableOpacity onPressIn={() => pressCardSelHandler(elem.tileIndx)}>
                                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                                        {/* <Text style={globalStyles.titleIndx}>Tile {elem.tileIndx+1}</Text> */}
                                        <View style={{ flexShrink:2, flexBasis:'65%'}}>                                        
                                            <Text onPress={()=> openSelCam(elem.tileIndx)} onLongPress={()=> openSelCam(elem.tileIndx) } style={globalStyles.titleText}>{elem.camName}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',}}>
                                           
                                            <MaterialCommunityIcons name="record-circle" 
                                                size={20}
                                             color="red"
                                             onPress={()=>showCamRec(elem)}
                                              />
                                            <MaterialIcons
                                                name='close'
                                                size={20}
                                                color="gray"
                                                onPress={() => deSeleCam(elem)}
                                            />
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                </CardSelCam>                            
                            </View>
                        ))
                    }
            </View>
            <View style={{marginVertical:10}}>
                <RecordingBar />        
            </View>

       </View>
    )
}

const styles = StyleSheet.create({
    vwTileText:{
        flexDirection:'row',
        paddingRight:10,
        justifyContent:'center'
    },
    vwTileContainer:{
        
        width:'100%',
        height:300,
        backgroundColor:'#fff',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    vwTile:{
        backgroundColor:'orange',
        borderWidth:1,
        borderColor:'lightgray',
        width:'100%'
    },
    vwTile2:{
        
        width:'50%',
        backgroundColor:'red',
        borderWidth:1,
        borderColor:'lightgray',
    },
    vwTile3:{
        width:'50%',
        backgroundColor:'coral'
    },
    vwTile4:{
        width:'50%',
        backgroundColor:'lightgreen'
    },
    video: {
        alignSelf: 'center',
        width:'100%',  
        borderWidth:1,
        borderColor:'#fff',
        margin:5,
        paddingVertical:5,
        height:'70%',
      },
      vwCamList:{
          
      }
})
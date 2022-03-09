import React, { useState } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, { Callout, Circle, Marker, Overlay } from 'react-native-maps';
import { globalStyles } from '../shared/global';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Map = ()=>{
    const[pin, setPin]=useState({
            latitude:28.4417893,
            longitude:77.0330403,
    })
    const[pins, setPins] = useState([
        {
            latitude:28.4417893,
            longitude:77.0330403,
        },
        {
            latitude:28.4417876,
            longitude:77.033403,
        },
        {
            latitude:28.4412876,
            longitude:77.12403,
        },
        {
            latitude:28.4516876,
            longitude:77.023503,
        }
    ])
    return(
        <View style={globalStyles.container}>
            <View style={globalStyles.content}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude:28.4417893,
                        longitude:77.0330403,
                        latitudeDelta:0.01,
                        longitudeDelta:0.01
                    }}
                >
                    {
                        pins.map((p, indx)=>
                        <Marker key={indx}  
                        coordinate={p} 
                           description='good one'                    
                        >
                            <FontAwesome name="video-camera" size={24} color="blue" />
                            <Callout>
                                <Text>{p.longitude}</Text>
                            </Callout>
                        </Marker>
                        )
                    }

                </MapView>
            </View>

        </View>
    )
}

export default Map;

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width - 15,
        height: Dimensions.get('window').height/2
    }
})
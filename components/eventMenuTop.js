import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import CardGrid from '../shared/cardGrid';

export default function EventMenuTopComponent({itemPress}){
    return(
        <View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator= {false}
              contentContainerStyle={{ marginVertical:5, marginHorizontal:10}}>
                <View style={{ height:30, marginVertical:5, flexDirection:'row'}}>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Event Processing</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Details of event</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => itemPress('confirm')}> 
                        <CardGrid type=''>  
                            <Text>Confirm event</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => itemPress('cancel')}> 
                        <CardGrid type=''>  
                            <Text>Cancel event</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Start related camera</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Open related recording</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Open related images</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Event forwarding</Text>
                        </CardGrid>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <CardGrid type=''>  
                            <Text>Forwared events</Text>
                        </CardGrid>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </View>
    )
}
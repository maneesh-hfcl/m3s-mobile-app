import React from "react";
import {View, Text} from 'react-native';
import { Picker } from "@react-native-picker/picker";

export default function CardPicker({selLst}){
    return(
        <React.Fragment>
        {
            selLst.map((item, indx)=>
                <Picker.Item label={item.value} value={item.id} key={indx} />
            )
        }
        </React.Fragment>
    )
}
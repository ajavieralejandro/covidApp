import React,{useEffect} from 'react'
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import  Constants  from 'expo-constants';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const getCurrentLocation = async () =>{
    const {status} = await Location.requestForegroundPermissionsAsync();
    if(status!=='granted'){
        return Alert.alert("No hay permisos para cargar locación");
    }
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
}


export default function Locations() {
    useEffect(() => {
        getCurrentLocation();
    }, []);
    return (
        <View>
            <MapView style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}} />
        </View>
    )
}

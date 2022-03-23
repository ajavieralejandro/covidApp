import React,{useEffect,useState} from 'react'
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

import MapView from 'react-native-maps';
import  Constants  from 'expo-constants';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Button,ActivityIndicator } from 'react-native-paper';
//import Geolocation from '@react-native-community/geolocation';


const addLocation = async (location) =>{
    const currentLocation = {
        latitude : location.latitude,
        longitude : location.longitude
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentLocation)
  };


  try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/setCurrentLocation', requestOptions)
      .then(response =>response.json())
      .then((json)=>{
        if(json.status==='fail')
          Alert.alert(json.message);
        else
          Alert.alert("Locacion agregada");


      })
    }
      catch(err){
        Alert.alert(err.message);
      }

    
    
  }



export default function Locations() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Hola estoy aca 1");
        getCurrentLocation();
    }, []);

const getCurrentLocation = async () =>{

    const {status} = await Location.requestForegroundPermissionsAsync();
    if(status!=='granted'){
        return Alert.alert("No hay permisos para cargar locación");
    }
    try{
        //let aux = await Geolocation.getCurrentPosition(info => console.log(info));
        const userLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        console.log(userLocation);
        let aux = {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          }
        setLocation(aux);
        

    }
    catch(err){
        console.log(
            "holardis"
        )
        console.log(err);
    }
    setLoading(false);
    
}
    return (
        <View style={styles.container}>
              {loading?<View style={{
        position:"absolute",
        top:'50%',
        left:'50%'
      }}>
      <ActivityIndicator style={{
      }}
    /></View>:       <View>
    {location?
        <MapView 
        showsUserLocation={true}
        initialRegion={location}
          style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height-200}} />
        : null
    }
    <Button onPress={()=>addLocation(location)}>Agregar Locación</Button>
    <Button>Ver locaciones</Button>
    </View>}
     

        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'flex-start'
    }
})

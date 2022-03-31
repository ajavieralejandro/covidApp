import React,{useEffect,useState} from 'react'
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView,{Marker} from 'react-native-maps';
import  Constants  from 'expo-constants';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Button,ActivityIndicator } from 'react-native-paper';
//import Geolocation from '@react-native-community/geolocation';

const updateContacts = async () => {
    console.log("Hola estoy en update contacts"
    );
    const token = await AsyncStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },
      
  };


  try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/contacts/getContactsWithin', requestOptions)
      .then(response =>response.json())
      .then((json)=>{
        console.log(json);
        if(json.status==='error')
          Alert.alert(json.message);


      })
    }
      catch(err){
        console.log("ocurrio un error : ",err);
        Alert.alert(err.message);
      }

}




export default function Locations() {
    const [location, setLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const getLocations = async (mounted) =>{
        console.log("HOla estoy tratando de acceder a las locaciones");
        const token = await AsyncStorage.getItem('token');
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },
          
      };
    
    
      try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/locations/locations', requestOptions)
          .then(response =>response.json())
          .then((json)=>{
            console.log("Voy a imprimir el json");
            console.log(json);
            if(json.status==='error')
              Alert.alert(json.message);
            else
            {
                console.log("Hola estoy aca");
                let locations = json.data;
                const _toAdd = [];
                locations.forEach(el=>_toAdd.push({//...el.currentLocation.coordinates
                    latitude : el.currentLocation.coordinates[0],
                    longitude : el.currentLocation.coordinates[1]
                }));
                if(mounted)setLocations(_toAdd);
            }
    
    
          })
        }
          catch(err){
            console.log("Hola estoy aca en error");
            Alert.alert(err.message);
          }
    
    
    }
    const addLocation = async (location) =>{
        const token = await AsyncStorage.getItem('token');
        const currentLocation = {
            latitude : location.latitude,
            longitude : location.longitude
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json, text/plain, */*','Authorization':`Bearer ${token}` },
          body: JSON.stringify(currentLocation),
          
      };
    
    
      try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/locations/setCurrentLocation', requestOptions)
          .then(response =>response.json())
          .then((json)=>{
            console.log(json);
            if(json.status==='fail')
              Alert.alert(json.message);
            else{
                Alert.alert("Locacion agregada");
                //Llamo a los otros metodos
                //getLocations();
                updateContacts();
                getLocations();

    
    
            }
    
    
          })
        }
          catch(err){
            Alert.alert(err.message);
          }
    
        
        
      }
    
    
    
    

    useEffect(() => {
      let mounted = true;

        getCurrentLocation(mounted);
        getLocations(mounted);
        return () => mounted = false;

    }, []);

const getCurrentLocation = async (mounted) =>{

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
        if(mounted)
        setLocation(aux);
        

    }
    catch(err){
        console.log(
            "holardis"
        )
        console.log(err);
    }
    if(mounted)
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
          style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height-150}}>
              {show?locations.map((x,index)=><Marker key={index} coordinate={x}/>):null}
          </MapView>
        : null
    }
    <Button onPress={()=>addLocation(location)}>Agregar Locación</Button>
    <Button onPress={()=>setShow(!show)}>{show?"ocultar locaciones":"Ver locaciones"}</Button>
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

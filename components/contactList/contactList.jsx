import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { ActivityIndicator } from 'react-native';
import { ScrollView,View, Text, FlatList,StyleSheet,Image } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import SearchBar from '../searchBar/searchBar';
import AppBar from '../AppBar/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalculateRisk from '../../utils/utils';

const renderItem = (item) =>{
    const contact = item.item;
    return(<>
        <View style={styles.itemWrapperStyle}>
            <View >
            <Text>{contact.name} {contact.lastName}</Text>
            <Text>{contact.email}</Text>
            </View>


        </View>
        </>
    )

}



const styles = StyleSheet.create({
    itemWrapperStyle : {
        flexDirection : "row",
        paddingHorizontal : 16,
        paddingVertical : 16,
        borderBottomWidth : 1,
        borderColor : "#ddd",
    },
    itemImageStyle : {
        width : 50,
        height : 50,
        marginRight : 16
    },
    loaderStyle:{
        marginVertical : 16,
        alignItems : 'center'
    }
    
})


export default function ContactList() {


const getContacts2 = async () =>{
    console.log("Hola estoy tratando de obtener los contactos");
    const token = await AsyncStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },
      
  };


  try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/contacts/', requestOptions)
      .then(response =>response.json())
      .then((json)=>{
        console.log("Voy a imprimir el json");
        console.log(json);
        if(json.status==='error')
          Alert.alert(json.message);
        else
        {
            console.log("calculo nuevos datos :");
            console.log(json.data);
            setContacts(json.data);
            console.log(
            "Renderizando datos"
            )
            console.log(CalculateRisk(json.data));

         
            
        }
        setIsLoading(false);
      })
    }
      catch(err){
        console.log("Hola estoy aca en error");
        Alert.alert(err.message);
      }


}
   
    const [contacts, setContacts] = useState([]);
    const [page,setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreItem = () =>{
        setPage(page+1);
    }

    const renderLoader = () =>{
        return(
            isLoading? 
            <View>
                <ActivityIndicator size="large" color="black" />
            </View>: null
        )
    }
    
    const getContacts = () =>{
        setIsLoading(true);
        
        axios.get(`https://randomuser.me/api/?page=${page}&results=20`
            ).then(res=>{
                setContacts([...contacts,...res.data.results]);
                setIsLoading(false);


            });

    }

    useEffect(()=>{
        getContacts2()
        
    },[page]);


    return (
        <>
        <View style={{flex:1}}>
            <AppBar />
            <View>
                        <SearchBar label="buscar contacto" />
            </View>

            <FlatList 
                data={contacts} renderItem={renderItem} keyExtractor={item=>item.email}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                    
            />

        </View>
        </>

    )
}

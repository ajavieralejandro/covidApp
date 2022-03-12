import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { ScrollView,View, Text, FlatList } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import SearchBar from '../searchBar/searchBar';

const renderItem = ({item,index}) =>{
    console.log(index)
    return(
        <View key={index}>
            <Text>{item.name.first}</Text>
            <Text>{item.name.last}</Text>


        </View>
    )

}


export default function ContactList() {
   
    const [contacts, setContacts] = useState([]);
    const getContacts = () =>{
        
        axios.get("https://randomuser.me/api/?page=3&results=100"
            ).then(res=>{
                setContacts(res.data.results);
                console.log(res.data.results);
            });

    }

    useEffect(()=>{
        getContacts()
    },[]);

    return (
        <View style={{flex:1}}>
            <View>
                        <SearchBar label="buscar contacto" />
                        </View>

        <ScrollView >
            <FlatList data={contacts} renderItem={renderItem} keyExtractor={item=>item.email}/>

        </ScrollView>
        </View>

    )
}

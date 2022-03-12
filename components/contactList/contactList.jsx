import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { ActivityIndicator } from 'react-native';
import { ScrollView,View, Text, FlatList,StyleSheet,Image } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import SearchBar from '../searchBar/searchBar';


const renderItem = ({item}) =>{
    return(
        <View style={styles.itemWrapperStyle}>
            <Image style={styles.itemImageStyle} source={{uri : item.picture.large}} />
            <View >
            <Text>{item.name.title} {item.name.first} {item.name.last}</Text>
            </View>


        </View>
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
        getContacts()
    },[page]);


    return (
        <View style={{flex:1}}>
            <View>
                        <SearchBar label="buscar contacto" />
                        </View>

            <FlatList 
                data={contacts} renderItem={renderItem} keyExtractor={item=>item.email}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                    
            />

        </View>

    )
}

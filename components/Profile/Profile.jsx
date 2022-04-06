import React,{useState,useEffect} from 'react'
import { View} from 'react-native';
import { Portal, Text, Button, Provider } from 'react-native-paper';

import ProfileAppBar from '../ProfileAppBar/ProfileAppBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Modal from '../Modal/Modal';

import { Switch } from 'react-native-paper';



const handlePress = async (navigation) =>{
    try{
        await AsyncStorage.removeItem('token');
        navigation.navigation.navigate('OnBoarding');


    }
    catch(err){
        Alert.alert(err.message);
    }
}

const Profile = (navigation) => {
    const [risk, setRisk] = useState("")

    useEffect(() => {
       getUser()
    }, [visible]);
    const getUser = async () =>{
        const token = await AsyncStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
            
        };
      
      
        try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/me', requestOptions)
        .then(response=>response.json())
        .then(data=>{
            setRisk(data.data.doc.risk_status);
        });
        }
        catch(err){Alert.alert(err.message)};
        
    
    }

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [visible, setVisible] = React.useState(false);
    

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
        <View>
            <ProfileAppBar risk={risk}  />
            <Button onPress={()=>setVisible(true)}>Cargar Estado</Button>
            <Modal modalVisible={visible} setModalVisible={setVisible} />
            <Button onPress={()=>handlePress(navigation)}>Logout</Button>
           
        </View>
    )
}

export default Profile

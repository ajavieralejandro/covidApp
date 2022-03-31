import React from 'react'
import { View} from 'react-native';
import { Portal, Text, Button, Provider } from 'react-native-paper';

import ProfileAppBar from '../ProfileAppBar/ProfileAppBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Modal from '../Modal/Modal';

import { Switch } from 'react-native-paper';



const handlePress = async (navigation) =>{
    console.log(navigation);
    console.log("HOla me lleman a mi");
    try{
        await AsyncStorage.removeItem('token');
        navigation.navigation.navigate('OnBoarding');


    }
    catch(err){
        Alert.alert(err.message);
    }
}

const Profile = (navigation) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [visible, setVisible] = React.useState(false);
    

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
        <View>
            <ProfileAppBar />
            <Button onPress={()=>setVisible(true)}>Cargar Estado</Button>
            <Modal modalVisible={visible} setModalVisible={setVisible} />
            <Button onPress={()=>handlePress(navigation)}>Logout</Button>
           
        </View>
    )
}

export default Profile

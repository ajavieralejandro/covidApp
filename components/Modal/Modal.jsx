import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';




const App = ({modalVisible,setModalVisible}) => {
    const handlePress = () =>{
        updateRisk();
        setModalVisible(!modalVisible)
    }
    

const updateRisk = async () =>{
    const token = await AsyncStorage.getItem('token');
    let status = "green";
    if(test)
        status = "red";
    else{
        if(contact || sintoms)
            status = "yellow"
    }
    let toSent = {risk_status : status};

    console.log(toSent);
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
        body : JSON.stringify(toSent)
        
    };
  
  
    try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/updateMe', requestOptions)
    .then(response=>response.json())
    .then(data=>console.log(data));
    }
    catch(err){Alert.alert(err.message)};
    
}
    const [test, setTest] = useState(false);
    const [contact, setContact] = useState(false);
    const [sintoms, setSintoms] = useState(false);
    const toggleSwitch = () => {
        setTest(previousState => !previousState);}
        const toggleSwitch2 = () => {
            setContact(previousState => !previousState);}
            const toggleSwitch3 = () => {
                setSintoms(previousState => !previousState);}
    console.log("Hola me estan pasando");
    console.log(test);
    console.log(modalVisible);
    console.log(setModalVisible)
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Testeo Positivo</Text>
            <Switch value={test} onValueChange={toggleSwitch} />
        {            
        (!test)?<><Text style={styles.modalText}>Contacto Estrecho</Text>
            <Switch value={contact} onValueChange={toggleSwitch2}  />
            <Text style={styles.modalText}>Sintomas</Text>
            <Switch value={sintoms} onValueChange={toggleSwitch3} /></>:null}
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handlePress()}
            >
              <Text style={styles.textStyle}>Cargar Estado</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
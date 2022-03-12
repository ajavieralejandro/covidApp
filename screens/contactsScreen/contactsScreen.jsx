import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign : 'center'
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin Key'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>      <UserAvatar size={50} name={item.key} bgColor="#000" />
        {item.key}</Text>}
      />
    </View>
  );
}

export default FlatListBasics;
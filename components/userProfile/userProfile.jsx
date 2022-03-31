import React from 'react'
import { View, Text } from 'react-native'
import ProfileAppBar from '../ProfileAppBar/ProfileAppBar';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import StateModal from'../StateModal/StateModal';
export default function userProfile() {
    return (
        <View>
            <ProfileAppBar />
            <Text>Modal</Text>
            <StateModal />
            <ProfileDrawer />
        </View>
    )
}

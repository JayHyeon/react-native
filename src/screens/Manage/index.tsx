import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Manage as Style } from './Style';

function ManageScreen({navigation}: {navigation: any}) {

    const moveToCategoryManageScreen = () => {
        navigation.push('CategoryManage')
    }

    return (
        <View style={Style.container}>
            <TouchableOpacity
                onPress={()=> moveToCategoryManageScreen()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>카테고리 관리</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ManageScreen;
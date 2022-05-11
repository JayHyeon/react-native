import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { CategoryManage as Style } from './Style';

function CategoryManageScreen({navigation}: {navigation: any}) {

    const moveToCategoryAddScreen = () => {
        navigation.push('CategoryAdd');
    }

    return (
        <View style={Style.container}>
            <TouchableOpacity
                onPress={()=> moveToCategoryAddScreen()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>카테고리 등록</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CategoryManageScreen;
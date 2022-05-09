import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from './Style';
import Axios from "axios";
import { User } from '@common/Url';
import Progress from '@common/ProgressBar';

const enum INPUT_TYPE {
    ID,
    PW,
    NAME
}

function LoginScreen({navigation}: {navigation: any}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [progressBarDisplay, setProgressBarDisplay] = useState(false);

    const inputChange = (type: INPUT_TYPE, value: string) => {
        switch(type){
            case INPUT_TYPE.ID:
                setId(value);
                break;
            case INPUT_TYPE.PW:
                setPassword(value);
                break;
            case INPUT_TYPE.NAME:
                setName(value);
                break;
        }
    }

    const requestJoin = async () => {
        if(isLoading) {
            return
        }  
        Loading(true)
        await Axios
            .post(User.USER_JOIN, {
                id: id,
                password: password,
                name: name
            })     
            .then((response) => {
                moveToLoginScreen();
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
                Loading(false)
            });
    }

    const moveToLoginScreen = () => {
        navigation.navigate('Login');
    }

    const Loading = (value: boolean) => {
        setLoading(value);
        setProgressBarDisplay(value);
      }

    return (
        <View style={Style.container}>
            <View>
                <Text style={Style.title}>Join us</Text>
            </View>
            <View style={Style.inputAreaContainer}>
                <View style={Style.inputArea}>
                    <TextInput 
                        style={Style.inputBox} 
                        onChangeText={(text) => inputChange(INPUT_TYPE.ID, text)}
                        placeholder='ID'
                        placeholderTextColor="#adb5bd" />
                </View>
                <View style={Style.inputArea}>
                    <TextInput 
                        style={Style.inputBox} 
                        onChangeText={(text) => inputChange(INPUT_TYPE.PW, text)}
                        placeholder='Password'
                        placeholderTextColor="#adb5bd"
                        secureTextEntry={true} />
                </View>
                <View style={Style.inputArea}>
                    <TextInput 
                        style={Style.inputBox} 
                        onChangeText={(text) => inputChange(INPUT_TYPE.NAME, text)}
                        placeholder='Name'
                        placeholderTextColor="#adb5bd" />
                </View>
            </View>            
            <TouchableOpacity
                onPress={()=> requestJoin()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>가입하기</Text>
            </TouchableOpacity>
            <Progress display={progressBarDisplay}/>
        </View>
    );
}

export default LoginScreen;
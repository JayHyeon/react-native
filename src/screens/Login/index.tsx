import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Style from './Style';
import Axios from "axios";
import { User } from '@common/Url';
import Progress from '@common/ProgressBar';

const enum INPUT_TYPE {
    ID,
    PW
}

function LoginScreen({navigation}: {navigation: any}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
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
        }
    }

    const requestLogin = async () => {
        if(isLoading) {
            return
        }
        Loading(true)
        await Axios
            .post(User.USER_INFO, {
                id: id,
                password: password
            })     
            .then((response) => {
                AsyncStorage.setItem('user', JSON.stringify(response.data));
                AsyncStorage.setItem('isLogin', JSON.stringify(true));
                moveToPostScreen();
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
                Loading(false)
            });
    }

    const moveToPostScreen = () => {
        navigation.navigate('Post');
    }

    const moveToJoinScreen = () => {
        navigation.navigate('Join');
    }

    const Loading = (value: boolean) => {
        setLoading(value);
        setProgressBarDisplay(value);
    }

    return (
        <View style={Style.container}>
            <View>
                <Text style={Style.title}>Log in</Text>
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
            </View>            
            <TouchableOpacity
                onPress={()=> requestLogin()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> moveToJoinScreen()}
                style={Style.joinBtnContainer}>
                <Text style={Style.joinBtnText}>회원가입은 여기를 눌러주세요 :)</Text>
            </TouchableOpacity>
            <Progress display={progressBarDisplay}/>
        </View>
    );
}

export default LoginScreen;
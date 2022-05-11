import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View ,Button, TouchableOpacity, Text } from 'react-native';
import Style from './Style';

function MypageScreen({navigation}: {navigation: any}) {
  const [isLogin, setLogin] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    AsyncStorage.getItem('user', async (err, result) => {  
      if(result != null){
        setLogin(true);
        setLevel(JSON.parse(result).level)
      }else
        setLogin(false);
    });
  }, [])

  const requestLogout = () => {
    if(isLogin){
      AsyncStorage.clear();
      moveToPostScreen();
    }    
  }

  const moveToPostScreen = () => {
    navigation.navigate('Post');
  }

  const moveToLoginScreen = () => {
    navigation.navigate('Login');
  }

  const moveToManageScreen = () => {
    navigation.navigate('Manage');
  }

  return (
    <View>
      {
      isLogin ?
      <TouchableOpacity
          onPress={()=> requestLogout()}
          style={Style.loginBtnContainer}>
          <Text style={Style.loginBtnText}>로그아웃</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
          onPress={()=> moveToLoginScreen()}
          style={Style.loginBtnContainer}>
          <Text style={Style.loginBtnText}>로그인</Text>
      </TouchableOpacity>
      }      
      {
      level == 9 &&
      <TouchableOpacity
          onPress={()=> moveToManageScreen()}
          style={Style.loginBtnContainer}>
          <Text style={Style.loginBtnText}>관리자</Text>
      </TouchableOpacity>
      }
    </View>
  );
}

export default MypageScreen;
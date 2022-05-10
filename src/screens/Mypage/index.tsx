import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View ,Button, TouchableOpacity, Text } from 'react-native';
import Style from './Style';

function MypageScreen({navigation}: {navigation: any}) {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user', async (err, result) => {  
      if(result != null)
        setLogin(true);
      else
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

  return (
    <View>
      <Button title="MypageScreen d열기" />
      {
        isLogin &&
        <TouchableOpacity
          onPress={()=> requestLogout()}
          style={Style.loginBtnContainer}>
          <Text style={Style.loginBtnText}>로그아웃</Text>
      </TouchableOpacity>
      }      
    </View>
  );
}

export default MypageScreen;
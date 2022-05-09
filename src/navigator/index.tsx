import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import PostScreen from '@screens/Post';
import PostWriteScreen from '@screens/Post/Write';
import PostSearchScreen from '@screens/Post/Search';
import NotificateScreen from '@screens/Notificate';
import MypageScreen from '@screens/Mypage';
import PetShopScreen from '@screens/PetShop';
import LoginScreen from '@screens/Login';
import JoinScreen from '@screens/Join';

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Post">
                <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PostWrite" component={PostWriteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PostSearch" component={PostSearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Notificate" component={NotificateScreen} />
                <Stack.Screen name="Mypage" component={MypageScreen} />
                <Stack.Screen name="PetShop" component={PetShopScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Join" component={JoinScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator
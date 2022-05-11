import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
// Post
import PostScreen from '@screens/Post';
import PostWriteScreen from '@screens/Post/Write';
import PostSearchScreen from '@screens/Post/Search';
import PostDetailScreen from '@screens/Post/Detail';
// Notificate
import NotificateScreen from '@screens/Notificate';
// My page
import MypageScreen from '@screens/Mypage';
// Pet Shop
import PetShopScreen from '@screens/PetShop';
// Login
import LoginScreen from '@screens/Login';
// Join
import JoinScreen from '@screens/Join';
// Manage
import ManageScreen from '@screens/Manage';
import CategoryManageScreen from '@screens/Manage/Category';
import CategoryAddScreen from '@screens/Manage/CategoryAdd';


const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Post">
                <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                <Stack.Screen name="PostWrite" component={PostWriteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PostSearch" component={PostSearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Notificate" component={NotificateScreen} />
                <Stack.Screen name="Mypage" component={MypageScreen} />
                <Stack.Screen name="PetShop" component={PetShopScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Join" component={JoinScreen} />
                <Stack.Screen name="Manage" component={ManageScreen} />
                <Stack.Screen name="CategoryManage" component={CategoryManageScreen} />
                <Stack.Screen name="CategoryAdd" component={CategoryAddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator
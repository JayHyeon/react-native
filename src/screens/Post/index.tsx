import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Axios from "axios";
import { Post } from '@common/Url';
import { Post as Style } from './Style';
import { Common as StyleCommon } from '@common/Style'
import { PostItem } from './DataType';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import { header, HEADER_TYPE, search, write_action, WRITE_ACTION_TYPE } from '@actions/PostAction';
import Progress from '@common/ProgressBar';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HEADER_HEIGHT = Style.Header.height;
const LIMIT = 10;

const PostScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state.Post)  
  const headerValue = state.header;
  const searchText = state.search;
  const writeAction = state.write_action;
  const [isLoading, setLoading] = useState(false);
  const [postItems, setPostItems] = useState<PostItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));  
  const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp'
      }),
      offsetAnim
    ), 0, 1
  ));
  const [progressBarDisplay, setProgressBarDisplay] = useState(false);

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });
  const isFocused = useIsFocused();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('isLogin', async (err, result) => {
      if(result != null)
        setLogin(JSON.parse(result));
    });
  }, [isFocused])

  useEffect(() => {    
    return () => {
      setPostItems([]);
    }
  }, [])

  useEffect(() => {
    refresh();
  }, [headerValue])  

  useEffect(() => {    
    if(offset == 0 && postItems.length == 0){
      getPostList();
    }
  }, [offset])  

  useEffect(() => {    
    if(writeAction == WRITE_ACTION_TYPE.WRITE){
      refresh();
      dispatch(write_action(WRITE_ACTION_TYPE.INIT))
    }    
  }, [writeAction])  

  const Loading = (value: boolean) => {
    setLoading(value);
    setProgressBarDisplay(value);
  }

  const refresh = () => {
    setPostItems([]);
    setOffset(0);
  }

  const moveToMypageScreen = () => {
    navigation.push('Mypage');
  }

  const moveToNotificateScreen = () => {
    navigation.push('Notificate');
  }

  const moveToPetShopScreen = () => {
    navigation.push('PetShop');
  }

  const moveToPostWriteScreen = () => {    
    navigation.push('PostWrite');
  };

  const moveToSearchScreen = () => {
    navigation.push('PostSearch');
  }

  const moveToLoginScreen = () => {
    navigation.navigate('Login');
  }

  const cancelSearchMode = () => {
    dispatch(header(HEADER_TYPE.INIT))
    dispatch(search(''))
  }

  const getPostList = async () => {
    if(isLoading) {
      return
    }  
    Loading(true)    
    const word: string = searchText ? "/" + searchText : '';    
    await Axios
      .get(Post.POST_LIST_GET + word, {
        params: { 
          offset: offset,
          limit: LIMIT
        }
      })     
      .then((response) => {    
        setPostItems(postItems.concat(response.data));
        setOffset(offset + LIMIT);
      })
      .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
      })
      .finally(() => {
        Loading(false)
      });
  }

  const moveToDetailScreen = (postId: string) => {
    navigation.navigate('PostDetail', {postId: postId});
  }

  const renderItem = ({item}: {item: PostItem}) => {
    return (
      <TouchableOpacity onPress={() => moveToDetailScreen(item._id)}>
        <View style={Style.ItemContainer}>
            <View>
                <Text>user id : {item.createdAt}</Text>
            </View>
            <View>
                <Text>id : {item.idx.toString()}</Text>
            </View>
            <View>
                <Text>title : {item.title}</Text>
            </View>
            <View>
                <Text>content : {item.content}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
};

  return (
    <View style={Style.Container}>
      <View style={Style.ListContainer}>
        <Animated.View 
          style={[Style.Header, {
            transform: [{ translateY: navbarTranslate }]
          }]}
          onLayout={(event) => {
            let {height} = event.nativeEvent.layout;
            setClampedScroll(Animated.diffClamp(
              Animated.add(
                scrollAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp'
                }),
                offsetAnim
              ), 0, height)
            );
          }}>
          { headerValue == HEADER_TYPE.INIT ? 
            <View style={Style.HeaderContainer}>
              <View style={Style.HeaderIconContainer}>
                <Icon 
                  name="search" 
                  size={24} 
                  color="#ffffff" 
                  style={Style.HeaderSearchIcon}
                  onPress={moveToSearchScreen}/>
                {
                  !isLogin &&
                  <Icon2
                  name="login" 
                  size={24} 
                  color="#ffffff" 
                  style={Style.HeaderLoginIcon}
                  onPress={moveToLoginScreen}/>
                }      
              </View>              
              <Text style={Style.HeaderText}>HEADER</Text>
            </View>    
          : 
            <View style={Style.HeaderContainer}>
              <Icon 
                name="close" 
                size={24} 
                color="#ffffff" 
                style={Style.HeaderSearchIcon}
                onPress={cancelSearchMode}/>
                <View style={Style.SearchArea}>
                  <Text style={Style.HeaderSearchText} onPress={moveToSearchScreen}>{searchText}</Text>
                </View>                  
            </View>    
          }
                
        </Animated.View>
        <Animated.FlatList         
          data={postItems}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.idx)}
          onEndReachedThreshold={0.8}
          onEndReached={getPostList}
          
          contentInset={{ top: HEADER_HEIGHT }}
          bounces={true}
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollAnim }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        /> 
      </View>
      <View style={[StyleCommon.ButtonContainer, Style.ButtonContainer]}>
        <TouchableOpacity
            style={[StyleCommon.Button, StyleCommon.ButtonPositive]}
            onPress={moveToMypageScreen}>
            <Icon 
                name="user-o" 
                size={24} 
                color="red" />
            <Text style={StyleCommon.ButtonSmallText}>MY PAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[StyleCommon.Button, StyleCommon.ButtonPositive]}
            onPress={moveToNotificateScreen}>
            <Icon 
              name="file-text-o" 
              size={24} 
              color="red" />
            <Text style={StyleCommon.ButtonSmallText}>공지</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[StyleCommon.Button, StyleCommon.ButtonPositive]}
            onPress={moveToPetShopScreen}>
            <Icon 
              name="paw" 
              size={24} 
              color="red" />
            <Text style={StyleCommon.ButtonSmallText}>PET SHOP</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[StyleCommon.Button, StyleCommon.ButtonPositive, {marginRight: '1%'}]}
            onPress={moveToPostWriteScreen}>
            <Icon 
              name="pencil" 
              size={24} 
              color="red" />
            <Text style={StyleCommon.ButtonSmallText}>글 작성</Text>
        </TouchableOpacity>
      </View>
      <Progress display={progressBarDisplay}/>
    </View>
  );
}


export default PostScreen
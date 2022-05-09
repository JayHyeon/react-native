import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Axios from "axios";
import { Post } from '@common/Url';
import { Common as StyleCommon } from '@common/Style'
import { PostWrite as Style } from './Style';
import Progress from '@common/ProgressBar';
import { PostItem } from './DataType';

const PostDetailScreen = ({route, navigation}: {route: any, navigation: any}) => {
    const [postId, setPostId] = useState(route.params.postId)
    const [isLoading, setLoading] = useState(false);
    const [progressBarDisplay, setProgressBarDisplay] = useState(false);
    const [postInfo, setPostInfo] = useState<PostItem>();
    
    useEffect(() => {    
        getPostDetailInfo();
    }, [])

    const Loading = (value: boolean) => {
        setLoading(value);
        setProgressBarDisplay(value);
    }

    const getPostDetailInfo = async () => {
        if(isLoading) {
          return
        }  
        Loading(true)    
        await Axios
            .get(Post.POST_DETAIL_INFO + postId)     
            .then((response) => {    
                setPostInfo(response.data);
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
            Loading(false)
            });
      }

    return (
        <View style={Style.Container}>
            <Text>제목 : {postInfo?.title}</Text>
            <Text>내용 : {postInfo?.content}</Text>
            <Text>작성 시간 : {postInfo?.createdAt}</Text>
            <Progress display={progressBarDisplay}/>
        </View>
    );
}

export default PostDetailScreen
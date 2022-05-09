import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Axios from "axios";
import { Post } from '@common/Url';
import { Common as StyleCommon } from '@common/Style'
import { PostWrite as Style } from './Style';
import { useDispatch } from "react-redux";
import { write_action, WRITE_ACTION_TYPE } from '@actions/PostAction';

const enum INPUT_TYPE {
    TITLE,
    CONTENT
}

const PostWriteScreen = ({navigation}: {navigation: any}) => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleInputChange = (type: INPUT_TYPE, value: string) => {
        switch(type){
            case INPUT_TYPE.TITLE:
                setTitle(value)
                break;
            case INPUT_TYPE.CONTENT:
                setContent(value)
                break;
        }        
    }

    const requestPostInsert = () => {
        if(isLoading) {
            return
        }  
        setLoading(true)

        Axios
            .post(Post.POST_LIST_CREATE, {               
                title: title,  
                content: content
             })     
            .then(( response ) => {             
                finish('success')
            })            
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const finish = (result: string = '') => {
        if(result == 'success')
            dispatch(write_action(WRITE_ACTION_TYPE.WRITE))
        navigation.goBack();
    }

    return (
        <View style={Style.Container}>
            <TextInput
                style={StyleCommon.InputBox}
                value={title}
                placeholder={'Title'}
                onChangeText={ value => handleInputChange(INPUT_TYPE.TITLE, value)}/>                
            <TextInput
                style={[StyleCommon.InputBox, Style.InputContent]}
                multiline
                value={content}
                placeholder={'Content'}
                onChangeText={ value => handleInputChange(INPUT_TYPE.CONTENT, value)}/>
            <View style={StyleCommon.ButtonContainer}>                
                <TouchableOpacity
                    style={[StyleCommon.Button, StyleCommon.ButtonNegative]}
                    onPress={() => { finish() }}>
                    <Text style={[StyleCommon.ButtonText, StyleCommon.ButtonTextNegative]}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[StyleCommon.Button, StyleCommon.ButtonPositive]}
                    onPress={() => { requestPostInsert() }}>
                    <Text style={[StyleCommon.ButtonText, StyleCommon.ButtonTextPositive]}>작성</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PostWriteScreen
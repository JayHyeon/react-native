import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Axios from "axios";
import { Post } from '@common/Url';
import { Common as StyleCommon } from '@common/Style'
import { PostSearch as Style } from './Style';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { DB } from '@common/SQLite';
import { PostMapper } from '@common/SQLiteMapper';
import { PostSearchItem } from './DataType';
import { useSelector, useDispatch } from "react-redux";
import { header, HEADER_TYPE, search } from '@actions/PostAction';

const PostSearchScreen = ({navigation}: {navigation: any}) => { 
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state.Post)  
    const searchText = state.search;
    const [isLoading, setLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [searchWordItems, setSearchWordItems] = useState<PostSearchItem[]>([])
    useEffect(() => {      
        getSearchWords()
        setSearchWord(searchText)
        return () => {
            DB.close
        }
    }, [])   

    const getSearchWords = async () => {
        if(isLoading) return;
        setLoading(true)

        await DB.transaction((tx) => {
            tx.executeSql(PostMapper.SearchWordsList, [], (tx, results) => {           
                const rows = results.rows;
                let items: PostSearchItem[] = [];
        
                for (let i=0; i<rows.length; i++) {
                    items.push({...rows.item(i)});
                }

                setSearchWordItems(searchWordItems.concat(items));
                setLoading(false)
            })
        })
    }

    const handleInputChange = (value: string) => { 
        setSearchWord(value)
    }

    const selectedSearchItem = (value: string) => {        
        setSearchWord(value)
        searchSubmit(value)
    }

    const searchSubmit = async (value: string) => {
        if(value == '' || isLoading) return;
        setLoading(true)

        await DB.transaction((tx) => {           
            tx.executeSql(PostMapper.SearchWordExist, [value], (txn, results) => {                     
                if(results.rows.item(0).count > 0){
                    txn.executeSql(PostMapper.SearchWordUpdate, [value], (tx, results) => {
                        finish();
                        setGlobalSearchWord(value);
                    });
                }else{
                    tx.executeSql(PostMapper.SearchWordInsert, [value], (tx, results) => {
                        finish();
                        setGlobalSearchWord(value);
                    });
                }
                setLoading(false)
            })
        })

        setLoading(false)        
    }

    const setGlobalSearchWord = (value: string) => {
        dispatch(header(HEADER_TYPE.SEARCH))
        dispatch(search(value))
    }

    const finish = () => {
        navigation.goBack()
    }

    const renderItem = ({item}: {item: PostSearchItem}) => {     
        return (
            <TouchableOpacity onPress={() => selectedSearchItem(item.words)}>
                <View 
                    style={Style.ItemContainer}>    
                    <Icon 
                        name="clock" 
                        size={24} 
                        color="#000" 
                        style={Style.ClockIcon}/>
                    <Text style={Style.itemWord}>{item.words}</Text>       
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={Style.Container}>
            <View style={Style.SearchForm}>
                <Icon 
                    name="arrow-left" 
                    size={24} 
                    color="#000000" 
                    style={Style.BackButton}
                    onPress={finish}/>
                <TextInput
                    style={[StyleCommon.InputBox, Style.SearchInput]}
                    value={searchWord}
                    returnKeyType='search'
                    onSubmitEditing={ () => searchSubmit(searchWord)}
                    onChangeText={ value => handleInputChange(value)}/>    
            </View>     
            <View style={Style.SearchWordList}>        
                <FlatList         
                    data={searchWordItems}
                    renderItem={renderItem}
                    bounces={false}/>         
            </View>                
        </View>
    );
}

export default PostSearchScreen
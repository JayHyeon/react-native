import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { CategoryAdd as Style } from './Style';
import Axios from "axios";
import Progress from '@common/ProgressBar';
import { Category } from '@common/Url';
import SelectDropdown from 'react-native-select-dropdown'

function CategoryAddScreen({navigation}: {navigation: any}) {
    const [isLoading, setLoading] = useState(false);
    const [progressBarDisplay, setProgressBarDisplay] = useState(false);
    const [parent, setParent] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [categoryNameList, setCategoryNameList] = useState(['등록']);

    useEffect(() => {    
        getCategoryList();      
    }, []);

    const Loading = (value: boolean) => {
        setLoading(value);
        setProgressBarDisplay(value);
    }

    const checkList = () => {
        // categoryList.map(ary => console.log(ary.root));
        console.log(categoryNameList)
    }

    const selectedCategory = (index: Number) => {
        if(index == 0)
            registNewCategory()
        else
            categoryList.map(ary => ary.root.map((item: any, idx: Number) => {if(idx == +index-1) getChildCategoryList(item.idx)}))
    }

    const registNewCategory = () => {
        console.log(" new ");
    }
    
    const getChildCategoryList = (idx: Number) => {
        console.log(" child : ", idx);
    }

    const getCategoryList = async () => {
        if(isLoading) {
          return
        }  
        Loading(true)
        const value: string = parent ? "/" + parent : '';    
        await Axios
            .get(Category.CATEGORY_LIST + value)     
            .then((response) => {    
                console.log(response.data)
                if(parent == ''){
                    let rootAry: any = {
                        root: response.data
                    }                    
                    setCategoryList(categoryList.concat(rootAry))
                    
                    response.data.map((item: any) => setCategoryNameList(categoryNameList.concat(item.name)));                    
                }                    
                else{
                    let childAry: any = {
                        [parent]: response.data
                    }
                    setCategoryList(categoryList.concat(childAry));
                }                    
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
                Loading(false)
            });
    }

    return (
        <View style={Style.container}>
            <SelectDropdown
                data={categoryNameList}
                onSelect={(selectedItem, index) => {
                    selectedCategory(index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            <TouchableOpacity
                onPress={()=> checkList()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>check</Text>
            </TouchableOpacity>
            <Progress display={progressBarDisplay}/>
        </View>
    );
}

export default CategoryAddScreen;
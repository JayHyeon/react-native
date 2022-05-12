import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import { CategoryAdd as Style } from './Style';
import Axios from "axios";
import Progress from '@common/ProgressBar';
import { Category } from '@common/Url';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

function CategoryAddScreen({navigation}: {navigation: any}) {
    const [isLoading, setLoading] = useState(false);
    const [progressBarDisplay, setProgressBarDisplay] = useState(false);    
    const [categoryName, setCategoryName] = useState("");
    const [categoryList1, setCategoryList1] = useState<string[]>([]);
    const [categoryList2, setCategoryList2] = useState<string[]>([]);
    const [categoryList3, setCategoryList3] = useState<string[]>([]);
    const [categoryValue1, setCategoryValue1] = useState("");
    const [categoryValue2, setCategoryValue2] = useState("");
    const [categoryValue3, setCategoryValue3] = useState("");
    const [tempCategory, setTempCategory] = useState("");

    useEffect(() => {
        getCategoryList('');
    }, [])

    useEffect(() => {
        if(tempCategory == "") return;
        
    }, [tempCategory])

    const Loading = (value: boolean) => {
        setLoading(value);
        setProgressBarDisplay(value);
    }

    const inputChange = (text: string) => {
        setCategoryName(text);
    }

    const checkList = () => {
        // categoryList.map(ary => console.log(ary.root));
        console.log(categoryList1)
    }

    const requestCategoryAdd = async () => {  
        if(isLoading) {
            return
        }          
        Loading(true)

        await Axios
            .post(Category.CATEGORY_ADD, {
                // parent: parent,
                name: categoryName
            })     
            .then((response) => {    
                console.log(response)
            })
            .catch(e => {  // API 호출이 실패한 경우
                console.error(e);  // 에러표시
            })
            .finally(() => {
                Loading(false)
            });
    }

    const getCategoryList = async (parent: string) => {
        if(isLoading) {
          return
        }  
        Loading(true)
        const value: string = parent != "" ? "/" + parent : '';    
        await Axios
            .get(Category.CATEGORY_LIST + value)
            .then((response) => {      
                setTempCategory("등록");
                response.data.map((item: any) => {
                    setTempCategory(item.name);
                });
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
            <View style={Style.dropdownContainer}>
                <SelectDropdown
                    data={categoryList1}
                    buttonStyle={Style.dropdown}
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    defaultButtonText={'선택'}
                    onSelect={(selectedItem, index) => {
                        setCategoryList2([]);     
                        if(selectedItem != '등록'){
                            getCategoryList(selectedItem);
                        }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}/>
                <View style={Style.divider} />
                <SelectDropdown
                    data={categoryList2}
                    buttonStyle={Style.dropdown}
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    defaultButtonText={'선택'}
                    onSelect={(selectedItem, index) => {
                        setCategoryList3([]);     
                        if(selectedItem != '등록'){
                            getCategoryList(selectedItem);
                        }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}/>
                <View style={Style.divider} />
                <SelectDropdown
                    data={categoryList3}
                    buttonStyle={Style.dropdown}
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    defaultButtonText={'선택'}
                    onSelect={(selectedItem, index) => {
                      
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}/>
            </View>            
            <View style={Style.inputArea}>
                <TextInput 
                    style={Style.inputBox} 
                    onChangeText={(text) => inputChange(text)}
                    placeholder='Category Name'
                    placeholderTextColor="#adb5bd" />
            </View>
            <TouchableOpacity
                onPress={()=> requestCategoryAdd()}
                // onPress={()=> checkList()}
                style={Style.loginBtnContainer}>
                <Text style={Style.loginBtnText}>check</Text>
            </TouchableOpacity>
            <Progress display={progressBarDisplay}/>
        </View>
    );
}

export default CategoryAddScreen;
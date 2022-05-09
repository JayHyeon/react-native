import React from 'react';
import { View, Text } from 'react-native';
import { NotificateItem } from './DataType';
import { Notificate as Style } from './Style';

const renderItem = ({item}: {item: NotificateItem}) => {
    return (
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
    );
};

export {
    renderItem
}
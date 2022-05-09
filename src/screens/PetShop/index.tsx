import React from 'react';
import { View ,Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

function PetShopScreen() {
    return (
      <View>
        <ScrollView horizontal={true}>
          <Text>111111</Text>
          <Text>222222</Text>
          <Text>333333</Text>
          <Text>444444</Text>
          <Text>555555</Text>
          <Text>666666</Text>
          <Text>777777</Text>
          <Text>888888</Text>
          <Text>999999</Text>
        </ScrollView>
        <Button title="PetShopScreen d열기" />
      </View>
    );
}

export default PetShopScreen;
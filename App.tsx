import React from 'react';
import { SafeAreaView } from 'react-native';
import {Provider} from 'react-redux';
import store from '@store';
import Navigation from './src/navigator';

function App() {
  
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation/>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
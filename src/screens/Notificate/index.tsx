import React, { useState, useEffect } from 'react';
import { View, FlatList} from 'react-native';
import { Notificate } from '@common/Url';
import { Notificate as Style } from './Style';
import { Common as StyleCommon } from '@common/Style'
import { NotificateItem } from './DataType';
import Progress from '@common/ProgressBar';
import Axios from "axios";
import { renderItem } from './RenderNotificateItem';

const LIMIT = 10;

function NotificateScreen() {
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [progressBarDisplay, setProgressBarDisplay] = useState(false);
  const [notiItems, setNotiItems] = useState<NotificateItem[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {    
    if(offset == 0 && notiItems.length == 0){
      getNotificateList();
    }
  }, [offset])  

  const Loading = (value: boolean) => {
    setLoading(value);
    setProgressBarDisplay(value);
  }

  
  const getNotificateList = async () => {
    if(isLoading) {
      return
    }  
    Loading(true)
    const word: string = searchText ? "/" + searchText : '';    
    await Axios
      .get(Notificate.NOTIFICATE_LIST_GET + word, {
        params: { 
          offset: offset,
          limit: LIMIT
        }
      })     
      .then((response) => {    
        console.log(response.data)
        setNotiItems(notiItems.concat(response.data));
        setOffset(offset + LIMIT);
      })
      .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
      })
      .finally(() => {
        Loading(false)
      });
  }

  return (
    <View>
      <View style={Style.ListContainer}>        
        <FlatList         
          data={notiItems}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.idx)}
          onEndReachedThreshold={0.8}
          onEndReached={getNotificateList}
          bounces={true}
          scrollEventThrottle={8}/> 
      </View>
      <Progress display={progressBarDisplay}/>
    </View>
  );
}

export default NotificateScreen;
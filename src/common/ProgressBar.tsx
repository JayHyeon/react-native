import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";
import { Common as Style } from './Style';
 
const ProgressBar = ({display}: {display: boolean}) => {
    const isDisplay = display ? 'flex' : 'none';
  return (
    <View style={[Style.ProgressBarContainer, {display: isDisplay}]}>
        <Progress.CircleSnail
            style={Style.ProgressBar}
            color={['red', 'green', 'blue']}/>
    </View>
  );
};
 
export default ProgressBar;

import React from 'react';
import {View, Text} from 'react-native';

type DataPointProps = {
  text: string;
  dataPoint: number;
};

export const DataPoint = ({text, dataPoint}: DataPointProps) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 4}}>
      <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
        {text}:
      </Text>
      <Text
        style={{
          paddingLeft: 8,
          fontSize: 14,
          fontWeight: '700',
          color: 'white',
        }}>
        {dataPoint}
      </Text>
    </View>
  );
};

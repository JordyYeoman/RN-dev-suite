import React from 'react';
import {Text, View} from 'react-native';
import {Counter} from './Counter';
import FakeData from './FakeData';

function ReduxLearning() {
  return (
    <View>
      <Text>ReduxLearning</Text>
      <Counter />
      <FakeData />
    </View>
  );
}

export default ReduxLearning;

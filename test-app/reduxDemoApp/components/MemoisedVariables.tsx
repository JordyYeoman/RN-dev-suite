import React, {useMemo} from 'react';
import {View, Text} from 'react-native';

function MemoisedVariables() {
  console.log('We rendered');
  const test = useMemo(() => {
    return {name: 'Jordy', description: 'word'};
  }, []);

  return (
    <View>
      <Text>MemoisedVariables {test.name}</Text>
      <Text>MemoisedVariables {test.description}</Text>
    </View>
  );
}

export default MemoisedVariables;

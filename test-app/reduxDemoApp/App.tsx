/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MemoisedComponent from './components/MemoisedComponent';
import MemoisedVariables from './components/MemoisedVariables';
import ShallowComparison from './components/ShallowComparison';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to the Dev Suite</Text>
        <ShallowComparison />
        <Spacer />
        <MemoisedComponent />
        <MemoisedVariables />
      </View>
    </SafeAreaView>
  );
};

const Spacer = () => {
  return <View style={styles.spacer} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    height: '100%',
  },
  spacer: {
    height: 20,
  },
});

export default App;

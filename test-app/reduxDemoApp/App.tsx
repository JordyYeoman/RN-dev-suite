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
import Learning from './components/Learning/Learning';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to the Dev Suite</Text>
        <Learning />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    height: '100%',
  },
});

export default App;

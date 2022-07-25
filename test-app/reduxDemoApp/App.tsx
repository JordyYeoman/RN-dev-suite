import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Learning from './components/Learning/Learning';
import ReduxLearning from './components/ReduxDemo/ReduxLearning';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to the Dev Suite</Text>
        <Learning />
        <ReduxLearning />
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

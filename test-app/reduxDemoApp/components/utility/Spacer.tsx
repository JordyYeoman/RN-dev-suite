import React from 'react';
import {StyleSheet, View} from 'react-native';

function Spacer() {
  return <View style={styles.spacer} />;
}

export default Spacer;

const styles = StyleSheet.create({
  spacer: {
    height: 20,
  },
});

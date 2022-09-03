import React from 'react';
import {StyleSheet, View} from 'react-native';
import {themeStyles} from '../../styles/GlobalStyles';

const BoxLayout = ({children, marginTop}: any) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeStyles.secondary.backgroundColor,
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 4,
      marginTop: marginTop,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default BoxLayout;

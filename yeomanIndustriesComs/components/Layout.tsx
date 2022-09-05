import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

type Props = {
  children: JSX.Element;
};

function Layout({children}: Props) {
  console.log('CHILDREN: ', children);
  return (
    <SafeAreaView>
      <View>
        <Text>Layout Wrapper</Text>
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
}

export default Layout;

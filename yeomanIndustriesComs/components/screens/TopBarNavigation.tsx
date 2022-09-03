import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconToken} from '../../icons/YeetIcon';
import {GlobalStyles} from '../../styles/GlobalStyles';
import CircleNavButton from './CircleNavButton';

function TopBarNavigation({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <CircleNavButton
          iconToken={IconToken.USERCIRCLE}
          navigation={navigation}
          navigateTo={'Details'}
        />
        <View style={{paddingLeft: 10}} />
        <Text style={GlobalStyles.NavText}>Home</Text>
      </View>
      <View style={styles.flex}>
        <CircleNavButton
          iconToken={IconToken.PLUS}
          navigation={navigation}
          navigateTo={'Details'}
        />
        <View style={{paddingLeft: 10}} />
        <CircleNavButton
          iconToken={IconToken.SETTINGS}
          navigation={navigation}
          navigateTo={'BLEScanner'}
        />
      </View>
    </View>
  );
}

export default TopBarNavigation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

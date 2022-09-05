import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IconToken} from '../icons/YeetIcon';
import {RootState} from '../store/store';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ScreenType} from '../Types/Globaltypes';
import CircleNavButton from './CircleNavButton';

export type Props = {
  navigation: any;
  screen: ScreenType;
  title?: string;
};

const HomeNavBar = ({navigation}: any) => {
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
};

const SecondaryNavBar = ({navigation, title}: any) => {
  const {connected} = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <CircleNavButton
          iconToken={IconToken.BACKARROW}
          navigation={navigation}
          navigateTo={''}
          iconSize={26}
        />
        <View style={{paddingLeft: 10}} />
        <Text style={GlobalStyles.NavText}>{title}</Text>
      </View>
      <View
        style={[
          styles.flex,
          styles.status,
          {borderColor: connected ? 'green' : 'red'},
        ]}>
        <Text style={styles.secondaryNavigationText}>Online</Text>
      </View>
    </View>
  );
};

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
  secondaryNavigationText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  status: {
    borderBottomWidth: 2,
    marginBottom: -4,
  },
});

function TopBarNavigation({navigation, screen, title}: Props) {
  switch (screen) {
    case ScreenType.HOME:
      return <HomeNavBar navigation={navigation} />;
    case ScreenType.SECONDARY:
      return <SecondaryNavBar navigation={navigation} title={title ?? ''} />;
  }
}

export default TopBarNavigation;

import React from 'react';
import {ColorValue, StyleSheet, TouchableOpacity, View} from 'react-native';
import YeetIcon, {IconToken} from '../icons/YeetIcon';
import {themeStyles} from '../styles/GlobalStyles';

type CircleNavProps = {
  iconToken?: IconToken;
  iconSize?: number;
  navigation: any;
  navigateTo: string;
};

const CircleNavButton = (props: CircleNavProps) => {
  const {iconToken, navigation, navigateTo} = props;

  const CircleStyles = StyleSheet.create({
    container: {
      borderRadius: 100,
      width: 40,
      height: 40,
      backgroundColor: themeStyles.secondary.backgroundColor as ColorValue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: props.iconSize ?? 32,
      height: props.iconSize ?? 32,
    },
  });

  const handleNavigation = () => {
    if (navigateTo === '') {
      navigation.popToTop();
      return;
    }
    navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      style={CircleStyles.container}
      onPress={() => handleNavigation()}>
      <View style={CircleStyles.iconContainer}>
        {iconToken || iconToken === 0 ? (
          <YeetIcon iconToken={iconToken} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CircleNavButton;

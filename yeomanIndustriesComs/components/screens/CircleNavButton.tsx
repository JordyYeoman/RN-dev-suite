import React from 'react';
import {ColorValue, StyleSheet, TouchableOpacity, View} from 'react-native';
import YeetIcon, {IconToken} from '../../icons/YeetIcon';
import {themeStyles} from '../../styles/GlobalStyles';

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

  return (
    <TouchableOpacity
      style={CircleStyles.container}
      onPress={() => navigation.navigate(navigateTo)}>
      <View style={CircleStyles.iconContainer}>
        {iconToken || iconToken === 0 ? (
          <YeetIcon iconToken={iconToken} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CircleNavButton;

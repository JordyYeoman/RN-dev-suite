import React from 'react';
import {View} from 'react-native';
import SettingsIcon from './SettingsIcon';
import NotificationIcon from './NotificationIcon';
import PlusIcon from './PlusIcon';
import UserCircleIcon from './UserCircleIcon';

export enum IconToken {
  SETTINGS,
  CONNECT,
  PLUS,
  USER,
  USERCIRCLE,
  BELL,
}

type Props = {
  iconToken: IconToken;
};

const getIconForToken = (token: IconToken) => {
  switch (token) {
    case IconToken.SETTINGS:
      return <SettingsIcon />;
    case IconToken.CONNECT:
      return <SettingsIcon />;
    case IconToken.PLUS:
      return <PlusIcon />;
    case IconToken.USERCIRCLE:
      return <UserCircleIcon />;
    case IconToken.BELL:
      return <NotificationIcon />;
    default:
      return null;
  }
};

function YeetIcon(props: Props) {
  return <View>{getIconForToken(props.iconToken)}</View>;
}

export default YeetIcon;

import {Platform, UIManager, AppRegistry} from 'react-native';
import {name as appName} from './app.json';

/**
 * Uncomment below line to hide all LogBox warnings e.g. when taking screenshots/recordings
 */
// LogBox.ignoreAllLogs();

/** Enables RN's LayoutAnimation on Android */
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

AppRegistry.registerComponent(appName, () => require('./AppWrapper').default);

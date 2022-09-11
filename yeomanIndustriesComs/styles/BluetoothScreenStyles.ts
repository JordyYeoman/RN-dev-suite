import {StyleSheet, ColorValue} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {themeStyles} from './GlobalStyles';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 12,
    marginTop: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: themeStyles.secondary.backgroundColor as ColorValue,
  },
  buttonText: {
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 16,
    color: 'white',
  },
  flatList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 600,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  connectedDeviceContainer: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  connectedDevice: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginVertical: 6,
  },
  renderItem: {
    width: 100,
    height: 68,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: themeStyles.secondary.backgroundColor as ColorValue,
  },
  renderItemHeading: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  renderItemSubHeading: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  renderItemExtraSmall: {
    fontSize: 6,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

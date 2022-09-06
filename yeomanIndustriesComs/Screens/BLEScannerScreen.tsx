import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  ColorValue,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useInterval from '../utils/hooks/useInterval';
import {GlobalStyles, themeStyles} from '../styles/GlobalStyles';
import TopBarNavigation from '../components/TopBarNavigation';
import {Props, ScreenType} from '../Types/Globaltypes';
import {useDispatch, useSelector} from 'react-redux';
import {BleManager} from '../utils/bleManager';
import BoxLayout from '../components/BoxLayout';
import {readBLEDeviceAndUpdateValue} from '../store/Bluetooth/Slice';
import {RootState} from '../store/store';
import {Buffer} from 'buffer';

const bleManager = new BleManager();
const bleManagerEventEmitter = new NativeEventEmitter(NativeModules.BleManager);

const BLEScannerScreen = ({navigation}: Props) => {
  const [count, setCount] = useState(0);
  const [connectedID, setConnectedID] = useState('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devicesFound, setDevicesFound] = useState<any>([]);
  const [connectedDevices, setConnectedDevices] = useState<any>([]);
  const peripherals = new Map();
  const {deviceIds} = useSelector((state: RootState) => state.bluetooth);

  // BLUETOOTH EVENT LISTENERS
  const handleDiscoverPeripheral = (peripheral: {name: string; id: any}) => {
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setDevicesFound(Array.from(peripherals.values()));
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  };

  useEffect(() => {
    bleManager.start({showAlert: true});
    bleManagerEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEventEmitter.addListener('BleManagerStopScan', handleStopScan);
    return () => {
      console.log('unmount');
      bleManagerEventEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEventEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, []);

  const readBLEDeviceValue = () => {
    // console.log('READING VALUE?', deviceIds[0]);

    bleManager
      .read(
        deviceIds[0].peripheralID,
        deviceIds[0].serviceUUID,
        deviceIds[0].characteristicUUID,
      )
      .then((readData: any) => {
        const buffer = Buffer.from(readData);
        const sensorDataPoint = buffer.readUInt8(0, true);
        console.log('SENSOR DATA: ', sensorDataPoint);
        // if (state.sensorData.length <= 50) {
        //   state.sensorData.push(sensorDataPoint);
        // } else {
        // let newData: number[] = state.sensorData.slice(1);
        // newData.push(sensorDataPoint);
        // state.sensorData = newData;
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Poll the notification status:
  useInterval(() => {
    setCount(currentCount => currentCount + 1);
    readBLEDeviceValue();
  }, 50); // 50ms should mean 20 updates per second

  const handleNewDeviceConnection = (peripheral: any) => {
    console.log('Handling new connection');
    setConnectedDevices((prevState: string[]) => [
      ...prevState,
      peripheral?.id,
    ]);
  };

  const renderItem = (item: any) => {
    const color = item.connected ? 'green' : 'transparent';
    return (
      <TouchableHighlight
        style={styles.renderItem}
        onPress={() => {
          connectToPeripheral(
            item,
            bleManager,
            connectedDevices,
            handleNewDeviceConnection,
          );
        }}>
        <View style={[{backgroundColor: color}]}>
          <Text style={[styles.renderItemHeading, {color: 'white'}]}>
            {item.name}
          </Text>
          <Text style={[styles.renderItemSubHeading, {color: 'white'}]}>
            RSSI: {item.rssi}
          </Text>
          <Text
            style={[styles.renderItemSubHeading, styles.renderItemExtraSmall]}>
            ID: {item.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation
          navigation={navigation}
          screen={ScreenType.SECONDARY}
          title={'Devices'}
        />
        <Text>{count}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                setIsScanning(true);
                let foundDevices: any = scanForBleDevices(bleManager);
                if (foundDevices && foundDevices?.length > 0) {
                  setDevicesFound(foundDevices);
                }
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: isScanning ? themeStyles.shade.levelOne : 'white'},
                ]}>
                {isScanning ? 'Scanning' : 'Start Scan'}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <BoxLayout marginTop={10}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
            }}>
            Connected Devices:
          </Text>
          {connectedDevices && connectedDevices?.length > 0 ? (
            <View style={{flexDirection: 'row'}}>
              {connectedDevices.map((item: any) => (
                <View key={item}>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={{flexDirection: 'column'}}>
              <View style={{margin: 4}}>
                <Text>No Devices Connected</Text>
              </View>
            </View>
          )}
        </BoxLayout>
        <View style={{paddingHorizontal: 16, paddingTop: 12}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
            }}>
            Discovered Devices:
          </Text>
          {devicesFound?.length === 0 && (
            <View style={{marginTop: 8, marginBottom: 4}}>
              <Text style={{color: 'white'}}>No Devices Found</Text>
            </View>
          )}
        </View>
        <FlatList
          style={styles.flatList}
          data={devicesFound}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 50,
  },
  button: {
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 12,
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

export default BLEScannerScreen;

const scanForBleDevices = (bleManagerRef: BleManager) => {
  bleManagerRef
    .scan([], 3, true, {})
    .then(_results => {
      console.log('Devices Found: ', _results);
      return _results;
    })
    .catch(err => {
      console.error(err);
      return null;
    });
};

const connectToPeripheral = (
  peripheral: any,
  bleManagerRef: BleManager,
  state: any,
  stateCallback: Function,
) => {
  console.log('CONNTECTING TO PERIPHERAL - Meta: ', peripheral);
  bleManagerRef
    .connect(peripheral.id)
    .then(() => {
      // if (state.filter((el: {id: string}) => el.id === peripheral.id)) {
      //   console.log('We already connected bra');
      //   return;
      // }
      console.log('Connected to ' + peripheral.id);
      stateCallback(peripheral);
    })
    .catch(e => {
      console.log('ERROR OCCURRED: ', e);
    });
};

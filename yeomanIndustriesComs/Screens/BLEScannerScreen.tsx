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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useInterval from '../utils/hooks/useInterval';
import {GlobalStyles} from '../styles/GlobalStyles';
import TopBarNavigation from '../components/TopBarNavigation';
import {Props, ScreenType} from '../Types/Globaltypes';
import {useDispatch} from 'react-redux';
import {BleManager} from '../utils/bleManager';

const bleManager = new BleManager();
const bleManagerEventEmitter = new NativeEventEmitter(NativeModules.BleManager);

const BLEScannerScreen = ({navigation}: Props) => {
  const [count, setCount] = useState(0);
  const [connectedID, setConnectedID] = useState('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devicesFound, setDevicesFound] = useState<any>([]);
  const peripherals = new Map();
  const dispatch = useDispatch();

  const handleDiscoverPeripheral = (peripheral: {name: string; id: any}) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setDevicesFound(Array.from(peripherals.values()));
  };

  useEffect(() => {
    bleManager.start({showAlert: true});
    bleManagerEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    // bleManagerEventEmitter.addListener('BleManagerStopScan', handleStopScan);
    // bleManagerEventEmitter.addListener(
    //   'BleManagerDisconnectPeripheral',
    //   handleDisconnectedPeripheral,
    // );
    // bleManagerEventEmitter.addListener(
    //   'BleManagerDidUpdateValueForCharacteristic',
    //   handleUpdateValueForCharacteristic,
    // );
    return () => {
      console.log('unmount');
      bleManagerEventEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  }, []);

  // Poll the notification status:
  useInterval(() => {
    setCount(currentCount => currentCount + 1);
    if (
      connectedID !== null &&
      connectedID !== undefined &&
      connectedID !== ''
    ) {
      // dispatch(readBLEDeviceAndUpdateValue());
    }
  }, 50); // 50ms should mean 20 updates per second

  const renderItem = (item: any) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight
        onPress={() => {
          console.log('BUTTON PRESSED');
          connectToPeripheral(item, bleManager);
        }}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#333333',
              padding: 10,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
            }}>
            RSSI: {item.rssi}
          </Text>
          <Text
            style={{
              fontSize: 8,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
              paddingBottom: 20,
            }}>
            {item.id}
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
          title={'Bluetooth Menu'}
        />
        <Text>{count}</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={{margin: 10}}>
              <Button
                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                onPress={() => {
                  let foundDevices: any = scanForBleDevices(bleManager);
                  if (foundDevices && foundDevices?.length > 0) {
                    setDevicesFound(foundDevices);
                  }
                }}
              />
            </View>

            {devicesFound?.length == 0 && (
              <View style={{flex: 1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No Devices Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
        <FlatList
          data={devicesFound}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
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

const connectToPeripheral = (peripheral: any, bleManagerRef: BleManager) => {
  console.log('CONNTECTING TO PERIPHERAL - Connected: ', peripheral);
  console.log('CONNTECTING TO PERIPHERAL - ID: ', peripheral);
  bleManagerRef
    .connect(peripheral.id)
    .then(() => {
      // let p = state.peripheralDevices.get(peripheral.id);
      // if (p) {
      //   p.connected = true;
      //   state.peripheralDevices.set(peripheral.id, p);
      // }
      console.log('Connected to ' + peripheral.id);
      // state.connectedDevices.push(peripheral.id);
    })
    .catch(e => {
      console.log('ERROR OCCURRED: ', e);
    });
};

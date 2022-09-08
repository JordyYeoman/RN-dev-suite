import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  ColorValue,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useInterval from '../utils/hooks/useInterval';
import {GlobalStyles, themeStyles} from '../styles/GlobalStyles';
import TopBarNavigation from '../components/TopBarNavigation';
import {Props, ScreenType} from '../Types/Globaltypes';
import {useDispatch, useSelector} from 'react-redux';
import {BleManager} from '../utils/bleManager';
import BoxLayout from '../components/BoxLayout';
import {RootState} from '../store/store';
import {Buffer} from 'buffer';
import {addBLEDevice} from '../store/Bluetooth/Slice';

const bleManager = new BleManager();
const bleManagerEventEmitter = new NativeEventEmitter(NativeModules.BleManager);

const BLEScannerScreen = ({navigation}: Props) => {
  const [count, setCount] = useState(0);
  // const [connectedID, setConnectedID] = useState('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devicesFound, setDevicesFound] = useState<any>([]);
  const [connectedDevices, setConnectedDevices] = useState<any>([]);
  const peripherals = new Map();
  const {devices} = useSelector((state: RootState) => state.bluetooth);
  const dispatch = useDispatch();

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
  }, []); // Ignore error - This is fine as we need to only mount the listeners once

  const readRSSI = async (peripheralId: string) => {
    console.log('READING RSSI of ' + peripheralId);
    let x = await bleManager.readRSSI(peripheralId);
    console.log(x);
  };

  const getConnectedPeripherals = async (peripheralIds: string[]) => {
    let connectedPeripherals = await bleManager.getConnectedPeripherals(
      peripheralIds,
    );
    console.log('CONNECTED PERIPHERALS: ', connectedPeripherals);
  };

  const readBLEDeviceValue = () => {
    if (devices.length > 0) {
      bleManager
        .read(
          devices[0].peripheralID,
          devices[0].services[0],
          devices[0].characteristics[0].characteristic,
        )
        .then((readData: any) => {
          const buffer = Buffer.from(readData);
          const sensorDataPoint = buffer.readUInt8(0, true);
          console.log(sensorDataPoint);
          setCount(sensorDataPoint);
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
    }
  };

  // Poll the notification status:
  useInterval(() => {
    if (devices.length > 0 && connectedDevices.length > 0) {
      // setCount(currentCount => currentCount + 1);
      // Hijack setCount to display read value from bleDevice
      readBLEDeviceValue();
    }
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
        key={item}
        style={styles.renderItem}
        onPress={() => {
          connectToPeripheral(
            item,
            bleManager,
            connectedDevices,
            handleNewDeviceConnection,
            dispatch,
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

  const AppButton = ({
    buttonText,
    action,
  }: {
    buttonText: string;
    action: Function;
  }) => {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          action();
        }}>
        <Text
          style={[
            styles.buttonText,
            {color: isScanning ? themeStyles.shade.levelOne : 'white'},
          ]}>
          {buttonText}
        </Text>
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
            <AppButton
              buttonText={isScanning ? 'Scanning' : 'Start Scan'}
              action={() => {
                setIsScanning(true);
                let foundDevices: any = scanForBleDevices(bleManager);
                if (foundDevices && foundDevices?.length > 0) {
                  setDevicesFound(foundDevices);
                }
              }}
            />
            <AppButton
              buttonText={'Get Connected Devices'}
              action={() => {
                if (devices.length > 0) {
                  getConnectedPeripherals([
                    devices[0].services[0].toLowerCase(),
                  ]);
                }
              }}
            />
            <AppButton
              buttonText={'GetBondedPeripherals'}
              action={() => {
                bleManager.getBondedPeripherals();
              }}
            />
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
                <View style={styles.connectedDeviceContainer} key={item}>
                  <TouchableOpacity
                    style={styles.connectedDevice}
                    onPress={() => readRSSI(item)}>
                    <Text style={{fontSize: 10}}>{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      if (devices.length > 0) {
                        let x = await bleManager.isPeripheralConnected(item, [
                          devices[0].services[0],
                        ]);
                        console.log('isPeripheralConnected', x);
                      }
                    }}>
                    <Text>Check</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={async () => {
                      let res = await bleManager.createBond(item);
                      console.log('BONDED STATUS: ', res);
                    }}>
                    <Text>Bond</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      bleManager.disconnect(item);
                    }}>
                    <Text>X</Text>
                  </TouchableOpacity>
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

export default BLEScannerScreen;

const scanForBleDevices = (bleManagerRef: BleManager) => {
  bleManagerRef
    .scan([], 3, false, {})
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
  dispatch: Function,
) => {
  console.log('CONNTECTING TO PERIPHERAL - Meta: ', peripheral);
  bleManagerRef
    .connect(peripheral.id)
    .then(async () => {
      console.log('Connected to ' + peripheral.id);
      console.log('--------------------------------');
      console.log('Retreiving Services: ');
      let res: any = await bleManager.retrieveServices(peripheral.id, [
        '4FAFC201-1FB5-459E-8FCC-C5C9C331914B',
      ]);
      if (res) {
        dispatch(addBLEDevice(res));
      }
      console.log('Reading Value: ');
      // For some reason.... reading the value immediately triggers the ability to continue reading values,
      // without this read below the follow up reads fail.
      let initialValue = await bleManager.read(
        peripheral.id,
        res.services[0],
        res.characteristics[0].characteristic,
      );
      // let x = await bleManager.startNotification(
      //   peripheral.id,
      //   res.services[0],
      //   res.characteristics[0].characteristic,
      // );
      console.log('initialValue: ', initialValue);
      // Add event listener
      // bleManagerEmitter.addListener(
      //   'BleManagerDidUpdateValueForCharacteristic',
      //   ({value, peripheral, characteristic, service}) => {
      //     // Convert bytes array to string
      //     const data = bytesToString(value);
      //     console.log(`Received ${data} for characteristic ${characteristic}`);
      //   },
      // );
      // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
      console.log('--------------------------------');
      stateCallback(peripheral);
    })
    .catch(e => {
      console.log('ERROR OCCURRED: ', e);
    });
};

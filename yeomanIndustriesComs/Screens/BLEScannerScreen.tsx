import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles, themeStyles} from '../styles/GlobalStyles';
import TopBarNavigation from '../components/TopBarNavigation';
import {BluetoothContextType, Props, ScreenType} from '../Types/Globaltypes';
import {useDispatch, useSelector} from 'react-redux';
import BoxLayout from '../components/BoxLayout';
import {RootState} from '../store/store';
import {
  addBLEDevice,
  setConnectedDevices,
  setDevicesFound,
  setScanning,
} from '../store/Bluetooth/Slice';
import {BluetoothContext} from '../context/BluetoothContext';
import {BleManager} from '../utils/bleManager';
import {styles} from '../styles/BluetoothScreenStyles';

// TODO:
// 4. Check for connection status every x amount of time
// 5. Ensure we try to reconnect if device connection is lost
// 6. Allow ESP32 to reconnect a new device if connection is lost
// 7. Add X and Y coordinates to the linechart

const BLEScannerScreen = ({navigation}: Props) => {
  const {bleManager} = React.useContext(
    BluetoothContext,
  ) as BluetoothContextType;
  const {
    devicesFound,
    connectedDevices,
    devices,
    currentBLEDataPoint,
    isScanning,
  } = useSelector((state: RootState) => state.bluetooth);
  const dispatch = useDispatch();

  useEffect(() => {}, []); // Ignore error - This is fine as we need to only mount the listeners once

  const readRSSI = async (peripheralId: string) => {
    console.log('READING RSSI of ' + peripheralId);
    console.log(await bleManager.readRSSI(peripheralId));
  };

  const getConnectedPeripherals = async (peripheralIds: string[]) => {
    let connectedPeripherals = await bleManager.getConnectedPeripherals(
      peripheralIds,
    );
    console.log('CONNECTED PERIPHERALS: ', connectedPeripherals);
  };

  const handleNewDeviceConnection = (peripheral: any) => {
    console.log('Handling new connection');
    dispatch(setConnectedDevices(peripheral?.id));
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
        <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 8}}>
          {currentBLEDataPoint}
        </Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <AppButton
              buttonText={isScanning ? 'Scanning' : 'Start Scan'}
              action={() => {
                dispatch(setScanning(true));
                let foundDevices: any = scanForBleDevices(bleManager);
                if (foundDevices && foundDevices?.length > 0) {
                  dispatch(setDevicesFound(foundDevices));
                }
              }}
            />
            <AppButton
              buttonText={'Get Connected Devices'}
              action={() => {
                if (devices.length > 0 && devices[0]?.services?.length > 0) {
                  getConnectedPeripherals([
                    devices[0].services[0].toLowerCase(),
                  ]);
                }
              }}
            />
            <AppButton
              buttonText={'GetBondedPeripherals'}
              action={async () => {
                await bleManager.getBondedPeripherals();
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

export default BLEScannerScreen;

const scanForBleDevices = (bleManagerRef: BleManager) => {
  bleManagerRef
    .scan([], 3, false, {})
    .then(_results => {
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
      let res: any = await bleManagerRef.retrieveServices(peripheral.id, [
        '4FAFC201-1FB5-459E-8FCC-C5C9C331914B',
      ]);
      if (res) {
        dispatch(addBLEDevice(res));
      }
      console.log('Reading Value: ');
      // For some reason.... reading the value immediately triggers the ability to continue reading values,
      // without this read below the follow up reads fail.
      let initialValue = await bleManagerRef.read(
        peripheral.id,
        res.services[0],
        res.characteristics[0].characteristic,
      );
      // let x = await bleManagerRef.startNotification(
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
      // Actions triggering BleManagerDidUpdateValueForCharacteristic event
      console.log('--------------------------------');
      stateCallback(peripheral?.id);
    })
    .catch(e => {
      console.log('ERROR OCCURRED: ', e);
    });
};

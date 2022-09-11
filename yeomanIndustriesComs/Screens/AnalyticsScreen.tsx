import React, {useState} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useSelector, useStore} from 'react-redux';
import BoxLayout from '../components/BoxLayout';
import LineChart from '../components/charts/LineChart';
import TopBarNavigation from '../components/TopBarNavigation';
import {RootState} from '../store/store';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ScreenType} from '../Types/Globaltypes';
import useInterval from '../utils/hooks/useInterval';

export const AnalyticsScreen = ({navigation}: any) => {
  // Turns out its not more performant to only render every x milliseconds...
  // TODO: - figure out a way to performantly re-render the chart with new data.
  // const {getState} = useStore();
  // const [currentDPUpdate, setCurrentDPUpdate] = useState<number>(0);
  // const [sensorDataUpdate, setSensorDataUpdate] = useState<number[]>([]);
  // For more perfomant charting - only read the current value 'x' milliseconds,
  // instead of every time there is an update.
  // We will still read all values, but only update the chart every x amount of time.

  const {currentBLEDataPoint, sensorData} = useSelector(
    (state: RootState) => state.bluetooth,
  );

  // Poll the notification status:
  // useInterval(() => {
  //   const {currentBLEDataPoint, sensorData} = getState().bluetooth;
  //   setSensorDataUpdate(sensorData);
  //   setCurrentDPUpdate(currentBLEDataPoint);
  // }, 250); // 250ms should mean 4 updates per second

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation
          navigation={navigation}
          screen={ScreenType.SECONDARY}
          title={'Analytics'}
        />
        <BoxLayout>
          <View>
            <Text style={styles.currentDP}>
              Current Reading: {currentBLEDataPoint}
            </Text>
            <LineChart data={sensorData} />
          </View>
        </BoxLayout>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  currentDP: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 12,
    marginBottom: 4,
  },
});

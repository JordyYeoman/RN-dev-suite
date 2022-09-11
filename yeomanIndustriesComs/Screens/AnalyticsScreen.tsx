import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import BoxLayout from '../components/BoxLayout';
import LineChart from '../components/charts/LineChart';
import TopBarNavigation from '../components/TopBarNavigation';
import {RootState} from '../store/store';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ScreenType} from '../Types/Globaltypes';

export const AnalyticsScreen = ({navigation}: any) => {
  const {currentBLEDataPoint, sensorData} = useSelector(
    (state: RootState) => state.bluetooth,
  );

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

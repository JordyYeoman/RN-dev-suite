import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
import BoxLayout from './BoxLayout';
import PieChartWithDynamicSlices from './PieChartWithDynamicSlices';
import TopBarNavigation from './TopBarNavigation';

type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    itemName: string;
  };
  BLEScanner: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'Details' | 'BLEScanner'
>;

function HomeScreen({navigation}: Props) {
  const [connected, setConnected] = useState<boolean>(true);

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation navigation={navigation} />
        <BoxLayout marginTop={0}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              Analytics
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'white',
                  paddingRight: 4,
                }}>
                Status:
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: connected ? 'blue' : 'red',
                  height: 10,
                  width: 10,
                  marginTop: 2,
                }}></View>
            </View>
          </View>
          <PieChartWithDynamicSlices />
        </BoxLayout>
        <BoxLayout marginTop={16}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              paddingBottom: 16,
            }}>
            Recent Data
          </Text>
          <View style={{flexDirection: 'column'}}>
            <DataPoint text={'Heart Rate Variability'} dataPoint={144.1} />
            <DataPoint text={'Average Heart Rate'} dataPoint={71} />
            <DataPoint text={'Ectopic Beats'} dataPoint={12} />
            <DataPoint text={'Irregular Heart Beats'} dataPoint={3} />
            <DataPoint text={'Invalid Data Points /s'} dataPoint={428} />
          </View>
        </BoxLayout>
        <BoxLayout marginTop={16}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              paddingBottom: 16,
            }}>
            Connection Overview
          </Text>
          <View style={{flexDirection: 'column'}}>
            <DataPoint
              text={'Connection up-time (HOURS)'}
              dataPoint={parseFloat((168230 / 60 / 60).toFixed(2))}
            />
            <DataPoint text={'Average Heart Rate'} dataPoint={71} />
          </View>
        </BoxLayout>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;

type DataPointProps = {
  text: string;
  dataPoint: number;
};

const DataPoint = ({text, dataPoint}: DataPointProps) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 4}}>
      <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
        {text}:
      </Text>
      <Text
        style={{
          paddingLeft: 8,
          fontSize: 14,
          fontWeight: '700',
          color: 'white',
        }}>
        {dataPoint}
      </Text>
    </View>
  );
};

import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../styles/GlobalStyles';
import {RootState} from '../store/store';
import BoxLayout from '../components/BoxLayout';
import PieChartWithDynamicSlices from '../components/PieChartWithDynamicSlices';
import TopBarNavigation from '../components/TopBarNavigation';
import {Props, ScreenType} from '../Types/Globaltypes';
import {DataPoint} from '../components/DataPoint';

function HomeScreen({navigation}: Props) {
  const {connected} = useSelector((state: RootState) => state.user);

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation navigation={navigation} screen={ScreenType.HOME} />
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
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
                    backgroundColor: connected ? 'green' : 'red',
                    height: 10,
                    width: 10,
                    marginTop: 2,
                  }}></View>
              </View>
            </View>
            <PieChartWithDynamicSlices />
          </BoxLayout>
        </TouchableOpacity>
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

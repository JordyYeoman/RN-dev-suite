import React from 'react';
import type {RootState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../../store/counter/slice';
import {Button, Text, View} from 'react-native';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View>
        <Button
          title="Increment"
          aria-label="Increment value"
          onPress={() => dispatch(increment())}
        />
        <View>
          <Text>Count: {count ?? ''}</Text>
        </View>
        <Button
          title="Decrement"
          aria-label="Decrement value"
          onPress={() => dispatch(decrement())}
        />
      </View>
    </View>
  );
}

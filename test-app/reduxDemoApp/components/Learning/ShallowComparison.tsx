import React from 'react';
import {Text, View} from 'react-native';

// What is memoising a React Component?
// - It is caching its output and returning the cache
// instead of recomputing the component if the props haven't changed.

// Components are functions after all, so why not cache the output if the input doesnt change?

function ShallowComparison() {
  return (
    <View>
      <Text>ShallowComparison</Text>
      <MemoisedRaceEntrant name="Jordy" id="8eb71v4A" />
    </View>
  );
}

export default ShallowComparison;

// Will re-render on render of Parentcomponent
const RaceEntrant = ({name, id}: {name: string; id: string}) => {
  //   console.log('RaceEntract component Rendered');
  return (
    <View>
      <Text>{name}</Text>
      <Text>{id}</Text>
    </View>
  );
};

// Below will check prop values before each re-render
const MemoisedRaceEntrant = React.memo(RaceEntrant);

// Referentially stable - the reference in memory is the same each time the component is rendered

import React from 'react';
import Spacer from '../utility/Spacer';
import MemoisedComponent from './MemoisedComponent';
import MemoisedVariables from './MemoisedVariables';
import ShallowComparison from './ShallowComparison';

function Learning() {
  return (
    <>
      <ShallowComparison />
      <Spacer />
      <MemoisedComponent />
      <MemoisedVariables />
    </>
  );
}

export default Learning;

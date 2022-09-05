import {createAction} from '@reduxjs/toolkit';

export const getAverageOfValues = createAction<number[]>('getAverageOfValues');

import {action as actionTypes} from '../../../constants/action-types';

const defaultState = {
    context: {}
};

const context = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

export default context;
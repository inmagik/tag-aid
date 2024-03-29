import { TOGGLE_WITNESS } from '../../../actions';

const defaultState = {
  // D: true
};
export default (previousState = defaultState, { type, payload }) => {
  switch (type) {
    case TOGGLE_WITNESS:
      return {
        ...previousState,
        [payload]: !previousState[payload]
      };
    default:
      return previousState;
  }
};

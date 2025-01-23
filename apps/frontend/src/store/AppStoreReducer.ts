import { localStorageSet } from '@/utils/localStorage';
import { AppStoreState } from './config';

export type AppStoreAction = {
  type: string;
  payload?: unknown;
};

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppStoreReducer: React.Reducer<AppStoreState, AppStoreAction> = (state, action) => {
  // console.log('AppReducer() - action:', action);
  switch (action.type) {
    case 'DARK_MODE': {
      const darkMode: boolean = Boolean(action?.payload);
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode,
      };
    }
    default:
      return state;
  }
};

export default AppStoreReducer;

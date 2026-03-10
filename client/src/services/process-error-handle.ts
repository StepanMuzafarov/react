import type { AppDispatch } from '../types/state';

let dispatch: AppDispatch | null = null;

export const setDispatch = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;
};

export const processErrorHandle = (message: string): void => {
  if (dispatch) {
    import('../store/action').then(({ setError }) => {
      dispatch!(setError(message));
      setTimeout(() => {
        dispatch!(setError(null));
      }, 2000);
    });
  }
};
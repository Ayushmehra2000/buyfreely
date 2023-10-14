import { configureStore } from '@reduxjs/toolkit';
import { loginorlogoutReducer } from '../features/reducers/LoginOrLogoutReducer';
import { productReducer } from '../features/reducers/ProductReducer';
export const store = configureStore({
  reducer: {
    loginorlogoutReducer,productReducer
  },
});


import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/category-slice';
import locationReducer from '../features/location/location-slice';


export const store = configureStore({
	reducer: {
		category: categoryReducer,
		location: locationReducer,
	}
})
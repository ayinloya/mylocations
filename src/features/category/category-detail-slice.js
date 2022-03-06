import { createSlice } from '@reduxjs/toolkit'
import { loadCategories, saveCategories } from '../../app/localcache';

const initialState = {
	value: loadCategories()
}

const categoryDetailSlice = createSlice(
	{
		name: 'categoryDetail',
		initialState,
		reducers: {
			fetchCategory(state, action) {
				for (const category of state.value) {
					if (action.payload.id === category.id) {
						category.name = action.payload.name;
						break;
					}
				}
			}
			// edit
		}
	}
)


export const { added, removed, selected } = categoryDetailSlice.actions;
export default categoryDetailSlice.reducer;
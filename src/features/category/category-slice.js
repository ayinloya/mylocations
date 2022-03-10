import { createSlice } from '@reduxjs/toolkit'
import { loadCategories, saveCategories } from '../../app/localcache';

const initialState = {
	value: loadCategories(),
	selectedCount: 0,
	selected: ""
}

const categorySlice = createSlice(
	{
		name: 'category',
		initialState,
		reducers: {
			// add
			added(state, action) {
				state.value[Date.now()] = action.payload;
				state.selectedCount = 0;
				saveCategories(state.value)
			},
			// remove
			removed(state) {
				Object.keys(state.value).map((id) => {
					if (state.value[id].checked) {
						delete state.value[id]
					}
				})
				state.selectedCount = 0;
				saveCategories(state.value)
			},
			// update 
			categoryUpdated(state, action) {
				state.selectedCount = 0;
				state.value[action.payload.id] = { name: action.payload.name }
				saveCategories(state.value)
			},
			selected(state, action) {
				const category = state.value[action.payload];
				category.checked = !category.checked;
				if (category.checked) {
					state.selectedCount++;
				} else {
					state.selectedCount = Math.max(state.selectedCount - 1, 0)
				}

				let selectedId;
				// Set id to the first checked item, this is to help when we start unchecking
				for (const categoryId in state.value) {
					if (state.value[categoryId].checked) {
						selectedId = categoryId
						break
					}
				}

				state.selected = selectedId
			},
			fetchCategory(state, action) {
				return state.value[action.payload]
			}
			// edit
		}
	}
)


export const { added, removed, selected, categoryUpdated, categoriesLoaded } = categorySlice.actions;
export default categorySlice.reducer;
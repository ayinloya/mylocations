import { createSlice } from '@reduxjs/toolkit'
import { loadCategories, saveCategories } from '../../app/localcache';

const initialState = {
	value: loadCategories(),
	selectedCount: 0,
}

const categorySlice = createSlice(
	{
		name: 'category',
		initialState,
		reducers: {
			// view
			categoriesLoaded(state) {
				state.value.sort(function (a, b) {
					let x = a.name.toLowerCase();
					let y = b.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			},
			// add
			added(state, category) {
				const payload = { ...category.payload, id: Date.now() };
				state.value.push(payload)
				saveCategories(state.value)
			},
			// remove
			removed(state) {
				const categories = state.value.filter((category) => !category.checked)
				state.value = categories;
				state.selectedCount = 0;
				saveCategories(state.value)
			},
			// update 
			categoryUpdated(state, action) {
				state.selectedCount = 0;
				for (const category of state.value) {
					if (action.payload.id === category.id) {
						category.name = action.payload.name;
						category.checked = false
						break;
					}
				}
				saveCategories(state.value)
			},
			selected(state, action) {
				if (!action.payload.checked) {
					state.selectedCount++;
				} else {
					state.selectedCount = Math.max(state.selectedCount - 1, 0)
				}
				for (const category of state.value) {
					if (action.payload.id === category.id) {
						category.checked = !category.checked;
						break;
					}
				}
			},
			fetchCategory(state, action) {
				for (const category of state.value) {
					if (action.payload === category.id) {
						return category;
					}
				}
			}
			// edit
		}
	}
)


export const { added, removed, selected, categoryUpdated, categoriesLoaded } = categorySlice.actions;
export default categorySlice.reducer;
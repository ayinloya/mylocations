import { createSlice } from '@reduxjs/toolkit'
import { loadLocations, saveLocations } from '../../app/localcache';

const initialState = {
	value: loadLocations(),
	selectedCount: 0
}


const locationSlice = createSlice(
	{
		name: 'location',
		initialState,
		reducers: {
			// view
			locationsLoaded(state) {
				state.value.sort(function (a, b) {
					let x = a.name.toLowerCase();
					let y = b.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			},
			// add
			locationAdded(state, action) {
				state.value.push({ ...action.payload, id: Date.now() })
				saveLocations(state.value)
			},
			// remove
			locationRemoved(state) {
				const locations = state.value.filter((location) => !location.checked)
				state.value = locations;
				state.selectedCount = 0
				saveLocations(state.value)
			},
			locationFilteredByCategory(state, action) {
				if (!action.payload) {
					state.value = loadLocations()
					return state
				}
				const locations = loadLocations().filter((location) => location.categoryId == action.payload)
				state.value = locations;
				state.selectedCount = 0
			},
			groupedByCategory(state, action) {
				const locations = state.value.filter((location) => location.categoryId == action.payload)
				state.value = locations;
				state.selectedCount = 0
			},
			// edit
			locationUpdated(state, action) {
				state.selectedCount = 0;
				const pendingUpdate = state.value.find((location) => location.id == action.payload.id)
				const locations = state.value.filter((location) => location.id != action.payload.id)
				locations.push({ ...pendingUpdate, ...action.payload, checked: false })
				state.value = locations;
				saveLocations(state.value)
			},
			locationSelected(state, action) {
				if (!action.payload.checked) {
					state.selectedCount++;
				} else {
					state.selectedCount = Math.max(state.selectedCount - 1, 0)
				}
				for (const location of state.value) {
					if (action.payload.id === location.id) {
						location.checked = !location.checked;
						break;
					}
				}
			},
		}
	}
)


export const { locationAdded, locationUpdated, locationRemoved, locationSelected, locationsLoaded,
	locationFilteredByCategory } = locationSlice.actions;
export default locationSlice.reducer;
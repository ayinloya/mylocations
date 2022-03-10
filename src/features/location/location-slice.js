import { createSlice } from '@reduxjs/toolkit'
import { loadLocations, saveLocations } from '../../app/localcache';

const initialState = {
	value: loadLocations(),
	selectedCount: 0,
	isGrouped: false
}

const checkAndGroupLocations = (state) => {
	if (!state.isGrouped || state.value.length == 0) {
		return state.value;
	}

	const grouped = state.value.reduce((cache, location) => {
		(cache[location.categoryId] = cache[location.categoryId] || []).push(location);
		return cache;
	}, {});

	return grouped;
}

const sortLocations = locations => {
	return locations.sort(function (a, b) {
		let x = a.name.toLowerCase();
		let y = b.name.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	});
}


const locationSlice = createSlice(
	{
		name: 'location',
		initialState,
		reducers: {
			// view
			locationsLoaded(state) {
				console.log("state.value",state.value)
				state.value = sortLocations(state.value);
			},
			// add
			locationAdded(state, action) {
				state.value.push({ ...action.payload, id: Date.now() })
				state.value = sortLocations(state.value)
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
				state.selectedCount = 0
				if (!action.payload) {
					state.value = loadLocations()
					return state
				}
				const locations = loadLocations().filter((location) => location.categoryId == action.payload)
				state.value = locations;
			},
			toggleGroupByCategory(state) {
				state.selectedCount = 0
				state.isGrouped = !state.isGrouped
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
	locationFilteredByCategory, toggleGroupByCategory } = locationSlice.actions;
export { checkAndGroupLocations };
export default locationSlice.reducer;
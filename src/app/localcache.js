
export const loadLocations = () => {
    try {
      const locations = localStorage.getItem('locations');
      return JSON.parse(locations) ?? [];
    } catch (err) {
      return [];
    }
};
export const saveLocations = (locations) => {
    try {
		localStorage.setItem('locations', JSON.stringify(locations));
		return true;
    } catch (err) {
      return false;
    }
};

export const loadCategories = () => {
    try {
      const categories = localStorage.getItem('categories');
      return JSON.parse(categories) ?? {};
    } catch (err) {
      return [];
    }
};
export const saveCategories = (categories) => {
    try {
		localStorage.setItem('categories', JSON.stringify(categories));
		return true;
    } catch (err) {
      return false;
    }
};
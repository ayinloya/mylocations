import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LocationSelect from "./location-select";

import { locationAdded, locationUpdated } from "./location-slice";
import Tag from "./tag/tag";

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
const LocationForm = (props) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const initialState = { name: "", categoryIds: [], address: "", coordinates: { latitude: 0, longitude: 0 } };
  const selectedLocation = useSelector((state) => state.location.value.find((value) => value.id == location.hash.split("/")[3]));
  const [newLocation, setNewLocation] = useState(selectedLocation ?? initialState);
  const categories = useSelector((state) => state.category.value);
  const [useMapCoordinates, setUseMapCoordinates] = useState(false)
  const [message, setMessage] = useState();

  const handleChange = e => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value })
  }

  const setLatitude = e => {
    setNewLocation({ ...newLocation, coordinates: { latitude: parseFloat(e.target.value), longitude: newLocation.coordinates.longitude } })
  }

  const setLongitude = e => {
    setNewLocation({ ...newLocation, coordinates: { latitude: newLocation.coordinates.latitude, longitude: parseFloat(e.target.value) } })
  }

  function success(pos) {
    setNewLocation({ ...newLocation, coordinates: { latitude: pos.coords.latitude, longitude: pos.coords.longitude } })
  }

  const setCoordinates = locationCoordinates => {
    if (!locationCoordinates) return;
    setNewLocation({ ...newLocation, coordinates: { latitude: locationCoordinates.lat, longitude: locationCoordinates.lng } })
  }

  function error(err) {
    setMessage(error.message)
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, locationOptions);
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    if (newLocation.categoryIds.length == 0) {
      setMessage( "Please select at least one category")
      return;
    }
    if (props.isEditing) {
      dispatch(locationUpdated(newLocation))
    } else {
      dispatch(locationAdded(newLocation))
    }
    navigateTo('/locations')
    setNewLocation(initialState)
  }

  const changeCoordinatesView = e => {
    e.preventDefault();
    setUseMapCoordinates(!useMapCoordinates)
  }

  const onCategorySelected = e => {
    if (!newLocation.categoryIds.includes(e.target.value)) {
      setNewLocation({ ...newLocation, categoryIds: [...newLocation.categoryIds, e.target.value] })
    }
    setMessage()
  }

  const onCategoryRemoved = value => {
    if (newLocation.categoryIds.includes(value)) {
      const categoryIds = newLocation.categoryIds.filter((id) => id != value);
      setNewLocation({ ...newLocation, categoryIds: categoryIds });
    }
  }


  return (
    <div className="w-full max-w-md mx-auto md:my-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-11 pt-6 pb-11 mb-12  flex flex-col justify-center self-center">
        <div className="mb-4">
          <label htmlFor="name">
            Location Name
          </label>
          <input type="text" value={newLocation.name} name='name' placeholder='Location name' onChange={e => handleChange(e)} className="input-form  focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="latitude">Coordinates <button className="bg-blue-500 text-white p-1 text-xs shadow-sm m-2" onClick={changeCoordinatesView}>{useMapCoordinates ? "Manual Entry" : 'Use map'}</button></label>
          {!useMapCoordinates && <div>
            <input className="input-form " type="number" step="any" value={newLocation.coordinates.latitude} name='latitude' id='latitude' placeholder='latitude' onChange={e => setLatitude(e)} required />
            <input className="input-form " type="number" step="any" value={newLocation.coordinates.longitude} name='longitude' id='longitude' placeholder='longitude' onChange={e => setLongitude(e)} required />
          </div>}
          {useMapCoordinates && <div className="">
            <LocationSelect coordinates={newLocation.coordinates} setCoordinates={setCoordinates} />
          </div>}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <textarea value={newLocation.address} className="input-form " name="address" id="address" cols="30" rows="10" onChange={e => handleChange(e)} required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId">
            Category
            {!categories || categories.length == 0 && <Link to='/categories/new' className={` bg-blue-500 text-white
      group flex rounded-md items-center w-24 px-2 py-2 text-sm`}>Create new</Link>}
          </label>

          <select className="input-form" value={""} name="categoryId" id="categoryId" onChange={e => onCategorySelected(e)} >
            <option value="">Select Category</option>
            {categories && Object.entries(categories).map(([categoryId, category]) =>
              <option value={categoryId} key={categoryId}>
                {category.name}
              </option>)}
          </select>
          <div>
          {newLocation.categoryIds && newLocation.categoryIds.map((category)=>
				<Tag text={categories[category].name} onRemove={onCategoryRemoved} key={category} id={category}/>
				
				)}
          </div>
        </div>
        <button type='submit' className="btn">Save</button>
        {message && <div class="p-5 rounded-lg border border-red-400 bg-red-300 text-red-900" >{message}</div>}
      </form>
    </div>
  )
}


export default LocationForm
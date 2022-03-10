import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { locationAdded, locationUpdated } from "./location-slice";

const LocationForm = (props) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const initialState = { name: "", categoryId: "", address: "", coordinates: { latitude: 0, longitude: 0 } };
  const selectedLocation = useSelector((state) => state.location.value.find((value) => value.id == location.hash.split("/")[3]));
  const [newLocation, setNewLocation] = useState(selectedLocation ?? initialState);
  const categories = useSelector((state) => state.category.value);

  const handleChange = e => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value })
  }

  const setLatitude = e => {
    setNewLocation({ ...newLocation, coordinates: { latitude: parseFloat(e.target.value), longitude: newLocation.coordinates.longitude } })
  }

  const setLongitude = e => {
    setNewLocation({ ...newLocation, coordinates: { latitude: newLocation.coordinates.latitude, longitude: parseFloat(e.target.value) } })
  }


  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    setNewLocation({ ...newLocation, coordinates: { latitude: pos.coords.latitude, longitude: pos.coords.longitude } })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, locationOptions);
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    if (props.isEditing) {
      dispatch(locationUpdated(newLocation))
    } else {
      dispatch(locationAdded(newLocation))
    }
    navigateTo('/locations')
    setNewLocation(initialState)
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
          <label htmlFor="latitude">Coordinates</label>
          <input className="input-form " type="number" step="any" value={newLocation.coordinates.latitude} name='latitude' id='latitude' placeholder='latitude' onChange={e => setLatitude(e)} required />
        </div>
        <input className="input-form " type="number" step="any" value={newLocation.coordinates.longitude} name='longitude' id='longitude' placeholder='longitude' onChange={e => setLongitude(e)} required />
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

          <select className="input-form" value={newLocation.categoryId} name="categoryId" id="categoryId" onChange={e => handleChange(e)} required>
            <option value="">Select Category</option>
            {categories && Object.entries(categories).map(([categoryId, category]) =>
              <option value={categoryId} key={categoryId}>
                {category.name}
              </option>)}

          </select>
        </div>
        <button type='submit' className="btn">Save</button>
      </form>
    </div>
  )
}


export default LocationForm

import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MyModal from '../confirm-modal';
import OptionModal from '../option-modal';
import TopNav from '../top-nav/top-nav';
import LocationList from './location-list';
import * as locationActions from './location-slice';
import {checkAndGroupLocations} from './location-slice';

function Locations() {
  const dispatch = useDispatch();
  
  const selectedCount = useSelector((state) => state.location.selectedCount);
  const isGrouped = useSelector((state) => state.location.isGrouped);
  const categories = useSelector((state) => state.category.value);
  const selectedLocation = useSelector((state) => state.location.value.find((value) => !!value.checked));
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showOptionOpen, setshowOptionOpen] = useState(false)

  const canEdit = selectedCount == 1;
  const canDelete = selectedCount > 0;


  useEffect(() => {
    dispatch(locationActions.locationsLoaded())
  }, [])

  const filterByCategory = (e) => {
    dispatch(locationActions.locationFilteredByCategory(e.target.value))
  }

  const groupByCategory = (e) => {
    console.log("e.target.value", !e.target.value)
    dispatch(locationActions.toggleGroupByCategory())
  }

  const removeLocation = e => {
    dispatch(locationActions.locationRemoved());
  }

  const viewDetails = e => {
    setshowOptionOpen(false)
  }

  const viewMap = e => {
    setshowOptionOpen(false)
  }

  return (
    <div>
      <TopNav title="Location">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <Link to='/locations/new' className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Add</Link>
            )}
          </Menu.Item>
          {canEdit && <Menu.Item>
            {({ active }) => (
              <button onClick={(_) => setshowOptionOpen(true)} className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>View

              </button>
            )}
          </Menu.Item>}
          {canEdit && <Menu.Item>
            {({ active }) => (
              <Link to={`/locations/edit/${selectedLocation?.id}`} className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Edit</Link>
            )}
          </Menu.Item>}
        </div>
        {canDelete &&
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button onClick={(e) => setIsDialogOpen(true)} className={`${active ? 'bg-red-500 text-white' : 'text-red-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Delete</button>
              )}
            </Menu.Item>
          </div>}
      </TopNav>
      <div className="sm:px-6 w-full flex flex-col  items-center">
        <div className="px-4 md:px-10 md:w-8/12 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              Group By Category:
              <input type="checkbox" name="group" id="group" checked={isGrouped} onChange={groupByCategory} />
            </div>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Filter By:</p>
              <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1" onChange={filterByCategory}>
                <option value="">All</option>
                {categories && Object.entries(categories).map(([id, category])=> <option key={id} value={id} className="text-sm text-indigo-800">{category.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white md:py-7 md:w-8/12 w-full md:px-8">
          <div className="mt-7 overflow-x-auto">
            <LocationList />
          </div>
        </div>
      </div>

      <MyModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} confirm={removeLocation} confirmText="Delete" message="Delete location? This action cannot be reversed" />
      <OptionModal isOpen={showOptionOpen} setIsOpen={setshowOptionOpen} title="View Option" >
        <button
          type="button"
          className="btn-option text-black"
          onClick={(e) => setshowOptionOpen(false)}
        >
          Cancel
        </button>
        <Link to={`/locations/detail/${selectedLocation?.id}`}
          className="btn-option"
          onClick={viewDetails}
        >
          View Details
        </Link>
        <Link to={`/locations/map/${selectedLocation?.id}`}
          className="btn-option"
          onClick={viewMap}
        >
          View Map
        </Link>
      </OptionModal>
    </div>
  )
}

export default Locations

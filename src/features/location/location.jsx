
import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MyModal from '../confirm-modal';
import OptionModal from '../option-modal';
import TopNav from '../top-nav/top-nav';
import {  locationRemoved, locationSelected, locationsLoaded, locationFilteredByCategory } from './location-slice';

function Locations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.value);
  const selectedCount = useSelector((state) => state.location.selectedCount);
  const isGroupByCategory = useSelector((state) => state.location.groupByCategory);
  const categories = useSelector((state) => state.category.value);
  const selectedLocation = useSelector((state) => state.location.value.find((value) => !!value.checked));
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showOptionOpen, setshowOptionOpen] = useState(false)

  const canEdit = selectedCount == 1;
  const canDelete = selectedCount > 0;


  useEffect(() => {
    dispatch(locationsLoaded())
  }, [])


  const checkHandler = (value) => {
    dispatch(locationSelected(value))
  }

  const filterByCategory = (e) => {
    dispatch(locationFilteredByCategory(e.target.value))
  }

  const groupByCategory = (e) => {
    dispatch(groupedByCategory(e.target.value))
  }

  const removeLocation = e => {
    dispatch(locationRemoved());
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
              <Link to='/locations/new' className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Add</Link>
            )}
          </Menu.Item>
          {canEdit && <Menu.Item>
            {({ active }) => (
              <button onClick={(_) => setshowOptionOpen(true)} className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>View

              </button>
            )}
          </Menu.Item>}
          {canEdit && <Menu.Item>
            {({ active }) => (
              <Link to={`/locations/edit/${selectedLocation?.id}`} className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
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
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Group By:</p>
             <input type="checkbox" name="group" id="group" checked={isGroupByCategory} onChange={groupByCategory} />
            </div>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Filter By:</p>
              <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1" onChange={filterByCategory}>
                <option value="">All</option>
                {categories && categories.map((category)=> <option key={category.id} value={category.id} className="text-sm text-indigo-800">{category.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {locations && locations.map((location, index) =>
                  <tr tabIndex={index} key={location.id} className="focus:outline-none h-16 border border-gray-100 rounded">
                    <td>
                      <div className="ml-5">
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                          <input placeholder="checkbox" type="checkbox" className="absolute cursor-pointer w-full h-full" name={location.id} id={location.id} checked={!!location.checked} onChange={(e) => checkHandler(location)} />
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{location.name}</p>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
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

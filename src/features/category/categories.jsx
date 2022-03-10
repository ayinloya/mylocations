
import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MyModal from '../confirm-modal';
import { removeLocationWithCategory } from '../location/location-slice';
import TopNav from '../top-nav/top-nav';
import { removed, selected } from './category-slice';

const Categories = () => {
	const categories = useSelector((state) => state.category.value);
	const selectedCount = useSelector((state) => state.category.selectedCount);
	const selectedCategory = useSelector((state) => state.category.selected);
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const dispatch = useDispatch()

	const canEdit = selectedCount == 1;
	const canDelete = selectedCount > 0;



	const checkHandler = (value) => {
		dispatch(selected(value))
	}

	const removeCategory = e => {
		dispatch(removeLocationWithCategory(categories))
		dispatch(removed());
	}

	return (
		<div>
			<TopNav title="Category">
				<div className="px-1 py-1">
					<Menu.Item>
						{({ active }) => (
							<Link to='/categories/new' className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
								} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>Add</Link>
						)}
					</Menu.Item>
					{canEdit && <Menu.Item>
						{({ active }) => (
							<Link to={`/categories/edit/${selectedCategory}`} className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
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
			<div className="sm:px-6 flex justify-center  mb-20">
				<div className="bg-white py-4 md:py-7 px-4 md:px-8  w-full md:w-5/12">
					<div className="mt-7 overflow-x-auto">
						<table className="w-full whitespace-nowrap">
							<tbody>
								{categories && Object.entries(categories).map(([id, category], index) =>
									<tr tabIndex={index} key={id} className="focus:outline-none h-16 border border-gray-100 rounded">
										<td>
											<div className="ml-5">
												<div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
													<input placeholder="checkbox" type="checkbox" className="absolute cursor-pointer w-full h-full" name={id} id={id} checked={!!category.checked} onChange={(e) => checkHandler(id)} />
												</div>
											</div>
										</td>
										<td>
											<div className="">
												<div className="rounded-sm ">
													{index + 1}
												</div>
											</div>
										</td>
										<td className="">
											<div className="flex items-center">
												<p className="text-base font-medium leading-none text-gray-700 mr-2">{category.name}</p>
											</div>
										</td>
									</tr>)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<MyModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} confirm={removeCategory} confirmText="Delete" message={`Delete ${selectedCount} ${selectedCount > 1 ? 'categories' : 'category'}? Locations associated with the selected categories will be deleted. This action cannot be reversed`} />
		</div>
	)
}

export default Categories

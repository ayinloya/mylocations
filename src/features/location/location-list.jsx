import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import LocationItem from "./location-item";
import { checkAndGroupLocations } from './location-slice';


const LocationList = () => {
	const locations = useSelector((state) => checkAndGroupLocations(state.location));
	const isGrouped = useSelector((state) => state.location.isGrouped);
	const categories = useSelector((state) => state.category.value)

	if (locations.length == 0) {
		return (
			<span>No locations added</span>
		)
	}
	if (!isGrouped) {
		return (
			<table className="w-full whitespace-nowrap">
				<thead>
					<tr>
						<td></td>
						<td>
							<div className="flex items-center pl-5">
								<p className="text-base font-medium leading-none text-gray-700 mr-2">Location</p>
							</div>
						</td>
						<td>
							<div className="flex items-center pl-5">
								<p className="text-base font-medium leading-none text-gray-700 mr-2">Category</p>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					{locations && locations.map((location, index) =>
						<LocationItem location={location} index={index} key={location.id} />)
					}
				</tbody>
			</table>
		)
	}

	return (
		<div className="w-full whitespace-nowrap mb-20">
			{locations && Object.entries(locations).map(([categoryId, categoryLocations], index) =>
				<Disclosure key={index} className="focus:outline-none h-16 border border-solid border-gray-100 overflow-y-scroll shadow-sm">
					{({ open }) => (
						<>
							<Disclosure.Button className="flex justify-between w-full border-gray-600 border-solid px-4 py-2   rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
								<span className="text-lg">{categories[categoryId].name}</span>
								<svg className={`${open ? 'transform rotate-180' : ''
									} w-5 h-5 text-gray-500`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
								</svg>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<table className="w-full whitespace-nowrap">
									<thead>
										<tr>
											<td></td>
											<td>
												<div className="flex items-center pl-5">
													<p className="text-base font-medium leading-none text-gray-700 mr-2">Location</p>
												</div>
											</td>
											<td>
												<div className="flex items-center pl-5">
													<p className="text-base font-medium leading-none text-gray-700 mr-2">Category</p>
												</div>
											</td>
										</tr>
									</thead>
									<tbody>
										{categoryLocations && categoryLocations.map((location, locationIndex) =>
											<LocationItem location={location} index={locationIndex} key={location.id} />)
										}
									</tbody>
								</table>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			)}
		</div>
	)
}

export default LocationList
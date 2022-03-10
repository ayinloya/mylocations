import { useDispatch, useSelector } from "react-redux";
import * as locationActions from './location-slice';
import Tag from './tag/tag'

const LocationItem = (props) => {

	const categories = useSelector((state) => state.category.value)

	const dispatch = useDispatch();

	const checkHandler = (value) => {
		dispatch(locationActions.locationSelected(value))
	}

	const location = props.location;
	const index = props.index;

	return (<tr tabIndex={index} className="focus:outline-none h-16 border border-gray-100 rounded">
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
		<td className="">
			<div className="flex items-center pl-5">
				{location.categoryIds && location.categoryIds.map((category)=>
				<Tag text={categories[category].name} key={category}/>
				
				)}
				{/* <p className="text-base font-medium leading-none text-gray-700 mr-2"><Tag text={categories[location.categoryId].name} /><Tag text={categories[location.categoryId].name} /><Tag text={categories[location.categoryId].name} /><Tag text={categories[location.categoryId].name} /><Tag text={categories[location.categoryId].name} /></p> */}
			</div>
		</td>
	</tr>)


}

export default LocationItem
import { useSelector } from "react-redux";

const LocationDetail = () => {
	const selectedLocation = useSelector((state) => state.location.value.find((value) => value.id == location.hash.split("/")[3]));
	const categories = useSelector((state) => state.category.value);

	return (
		<div className="w-full max-w-md mx-auto my-8">
			<div className="mb-4">
				<label htmlFor="name">
					Location Name
				</label>
				<input type="text" defaultValue={selectedLocation.name} name='name' placeholder='Location name' className="input-form  focus:outline-none focus:shadow-outline" readOnly />
			</div>
			<div className="mb-4">
				<label htmlFor="latitude">Coordinates</label>
				<input className="input-form " type="number" step="any" defaultValue={selectedLocation.coordinates.latitude} name='latitude' id='latitude' placeholder='latitude' readOnly />
			</div>
			<input className="input-form " type="number" step="any" defaultValue={selectedLocation.coordinates.longitude} name='longitude' id='longitude' placeholder='longitude' readOnly />
			<div className="mb-4">
				<label htmlFor="address">Address</label>
				<textarea defaultValue={selectedLocation.address} className="input-form " name="address" id="address" cols="30" rows="10" readOnly></textarea>
			</div>
			<div className="mb-4">
				<label htmlFor="categoryId">
					Category
				</label>
				<select className="input-form disabled" disabled defaultValue={selectedLocation.categoryId} name="categoryId" id="categoryId" readOnly>
					<option value="">Select Category</option>
					{categories && categories.map((category) =>
						<option value={category.id} key={category.id}>
							{category.name}
						</option>)}
				</select>
			</div>
		</div>
	)
}


export default LocationDetail
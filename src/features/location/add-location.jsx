import TopNav from "../top-nav/top-nav"
import LocationForm from "./location-form"

const AddLocation = () => {
	return (
		<div>
			<TopNav title="Location" >
			</TopNav>
				<LocationForm isEditing={false} />
		</div>
	)
}


export default AddLocation
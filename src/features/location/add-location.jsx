import TopNav from "../top-nav/top-nav"
import LocationForm from "./location-form"

const AddLocation = () =>{
	return (
		<div>
			<TopNav title="Location" >
				</TopNav>
			<div className="w-full max-w-md mx-auto my-8">			
			<LocationForm isEditing={false} />
		</div>
		</div>
	)
}


export default AddLocation
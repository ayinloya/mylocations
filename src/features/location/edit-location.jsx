import TopNav from '../top-nav/top-nav'
import LocationForm from './location-form'

const EditLocation =() => {
	return (
		<div>
			<TopNav title="Location" />
			<LocationForm isEditing={true} />
		</div>
	)
}


export default EditLocation
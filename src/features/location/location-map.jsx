import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from "react-redux";

const LocationMap = () => {
	const selectedLocation = useSelector((state) => state.location.value.find((value) => value.id == location.hash.split("/")[3]));
const markerlocation = {lat: selectedLocation.coordinates.latitude, lng: selectedLocation.coordinates.longitude};
	const containerStyle = {
		width: '100vw',
		height: '100vh'
	  };

	return (
		<div className='w-screen h-screen'>
			<LoadScript
				googleMapsApiKey={import.meta.env.VITE_MAP_KEY}
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={markerlocation}
					zoom={10}
				>
					{ /* Child components, such as markers, info windows, etc. */}
					<Marker
					position={markerlocation}/>
					<></>
				</GoogleMap>
			</LoadScript>
		</div>
	)
}

export default LocationMap
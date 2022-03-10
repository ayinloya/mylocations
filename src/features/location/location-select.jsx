import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import { Marker } from '@react-google-maps/api';

const LocationSelect = (props) => {
	const { coordinates, setCoordinates } = props;
	const mapState = {
		lat: coordinates.latitude,
		lng: coordinates.longitude,
		zoom: 10,
		center: [coordinates.latitude, coordinates.longitude],
		draggable: true
	}
	const [mapOption, setMapOption] = useState(mapState)
	const onDragEnd = (e) => {
		setMapOption({...mapOption, lat: e.latLng.lat(), lng: e.latLng.lng()})
		if(setCoordinates){
			setCoordinates(mapOption)
		}
	}
	const containerStyle = {
		width: '400px',
		height: '400px'
	  };

	return (
		<div className='w-full h-fit'>
			<LoadScript
				googleMapsApiKey={import.meta.env.VITE_MAP_KEY}
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{lat: mapOption.lat, lng: mapOption.lng}}
					zoom={mapOption.zoom}
				>
					{ /* Child components, such as markers, info windows, etc. */}
					<Marker 
					draggable={true}
					onDragEnd={onDragEnd}
					position={{lat: mapOption.lat, lng: mapOption.lng}}/>
					<></>
				</GoogleMap>
			</LoadScript>
		</div>
	)
}

export default LocationSelect
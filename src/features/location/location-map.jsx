import GoogleMapReact from 'google-map-react';
import { useSelector } from "react-redux";

const LocationMap = () => {
	const selectedLocation = useSelector((state) => state.location.value.find((value) => value.id == location.pathname.split("/")[3]));

	const Marker = ({ text, onClick }) => (
		<div onClick={onClick}>
			<div style={{ width: 80 }} className="font-medium text-red-600 text-xl">
				<svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
				</svg>
				{text}
			</div>
		</div>
	);

	return (
		<div className='w-screen h-screen'>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "" }}
				defaultCenter={[selectedLocation.coordinates.latitude, selectedLocation.coordinates.longitude]}
				defaultZoom={10}
				yesIWantToUseGoogleMapApiInternals
			>
				<Marker
					lat={selectedLocation.coordinates.latitude}
					lng={selectedLocation.coordinates.longitude}
					text={selectedLocation.name}
				/>
			</GoogleMapReact>
		</div>
	)
}

export default LocationMap
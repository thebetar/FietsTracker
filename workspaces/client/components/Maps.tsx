import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import MapView, { Region, LatLng, Marker } from 'react-native-maps';
import { Coords } from '../types';
import BicycicleImage from '../assets/bicycle.png';

export default function Maps({ coords }: { coords: Coords }) {
	function getCoords(): LatLng {
		return {
			latitude: coords.latitude || 52.378,
			longitude: coords.longitude || 4.9
		};
	}

	function getRegion(): Region {
		return {
			...getCoords(),
			latitudeDelta: 0.018,
			longitudeDelta: 0.018
		};
	}

	return (
		<View style={styles.container}>
			<Text h4>🚲 Hier is uw fiets 🚲</Text>
			<MapView
				provider={'google'}
				style={styles.map}
				region={getRegion()}
			>
				<Marker
					title={'Uw fiets'}
					coordinate={getCoords()}
					image={BicycicleImage}
				/>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	map: {
		marginVertical: 20,
		height: 300,
		width: 300
	}
});

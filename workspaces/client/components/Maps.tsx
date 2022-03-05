import { useState, useEffect } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView, { Region, LatLng, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coords } from '../types';
import BicycicleImage from '../assets/bicycle.png';
import axios from '../axios';

export default function Maps({ navigate }: { navigate: any }) {
	const [coords, setCoords] = useState<Coords>({
		latitude: undefined,
		longitude: undefined
	});

	async function getCoords() {
		try {
			const { data } = await axios.get('/tracking/coords');

			setCoords(data);

			await AsyncStorage.clear();
			await AsyncStorage.setItem('coords', JSON.stringify(data));
		} catch (error: any) {
			if (error && error.response && error.response.status === 403) {
				alert('Niet ingelogd.');
				navigate('/');
				return;
			}
			alert('Er ging iets fout bij het ophalen...');
			getCachedCoords();
		}
	}

	function isCoords() {
		return coords.latitude !== undefined && coords.longitude !== undefined;
	}

	async function getCachedCoords() {
		const coords = await AsyncStorage.getItem('coords');

		if (coords) {
			setCoords(coords as any);
		}
	}

	async function goToMaps() {
		const BASE_URL = 'https://www.google.com/maps/search/?api=1&query=';
		const lng = Number(coords.longitude).toFixed(7);
		const lat = Number(coords.latitude).toFixed(7);
		const RESULT_URL = `${BASE_URL}${lat},${lng}`;

		const supported = await Linking.canOpenURL(RESULT_URL);
		if (supported) {
			Linking.openURL(RESULT_URL);
		}
	}

	function parseCoords(): LatLng {
		return {
			latitude: coords.latitude || 52.378,
			longitude: coords.longitude || 4.9
		};
	}

	function getRegion(): Region {
		return {
			...parseCoords(),
			latitudeDelta: 0.018,
			longitudeDelta: 0.018
		};
	}

	useEffect(() => {
		getCachedCoords();
	}, []);

	return (
		<View style={styles.mapsContainer}>
			<Text h4>🚲 Hier is uw fiets 🚲</Text>
			<MapView
				provider={'google'}
				style={styles.map}
				region={getRegion()}
			>
				<Marker
					title={'Uw fiets'}
					coordinate={parseCoords()}
					image={BicycicleImage}
				/>
			</MapView>
			<View style={styles.innerMapsContainer}>
				<Button
					title={'🤔 \nWaar is mijn fiets?'}
					containerStyle={styles.buttonContainer}
					buttonStyle={{
						...styles.button,
						...styles.primary
					}}
					onPress={() => getCoords()}
				/>
				<Button
					title={'🗺️ \nGa naar maps'}
					containerStyle={styles.buttonContainer}
					buttonStyle={{
						...styles.button,
						...styles.secondary
					}}
					onPress={() => goToMaps()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mapsContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	innerMapsContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	map: {
		marginVertical: 20,
		height: 300,
		width: 300
	},
	buttonContainer: {
		margin: 8
	},
	button: {
		width: 140,
		fontSize: 32,
		padding: 6,
		borderRadius: 12
	},
	primary: {
		backgroundColor: '#4287f5',
		borderColor: '#244b8a',
		borderWidth: 2
	},
	secondary: {
		backgroundColor: '#a89732',
		borderColor: '#4a4216',
		borderWidth: 2
	}
});

import React, { useState, useCallback } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView, { Region, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import axios from '../../axios';

import { Coords, Log, Tracker } from '../../types';
import BicycleImage from '../../assets/bicycle.png';
import TrailerImage from '../../assets/trailer.png';
import MotorbikeImage from '../../assets/motorbike_avatar.png';
import ScooterImage from '../../assets/scooter.png';

export default function MapsScreen({
	navigate,
	route
}: {
	navigate: any;
	route: any;
}) {
	const [coords, setCoords] = useState<Coords>(DEFAULT_COORDS);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [tracker, setTracker] = useState<Tracker | null>(null);

	async function getCoords() {
		try {
			if (route?.params?.tracker?.id) {
				const tracker = route.params.tracker;

				const {
					data: { coords }
				} = await axios.get(`/trackers/coords/${tracker.id}`);

				setCoords(parseCoords(coords));
				setTracker(tracker);

				await AsyncStorage.setItem('tracker', JSON.stringify(tracker));
			} else {
				if (await getCachedCoords()) {
					return;
				}

				setCoords(DEFAULT_COORDS);
				setErrorMessage('Geen tracker geselecteerd');
			}
		} catch (error: any) {
			if (error && error.response && error.response.status === 403) {
				alert('Niet ingelogd.');
				navigate('/');
				return;
			}
			alert('Er ging iets fout bij het ophalen...');
		}
	}

	async function getCachedCoords(): Promise<boolean> {
		const tracker = JSON.parse(
			(await AsyncStorage.getItem('tracker').catch(console.error)) || ''
		);

		if (tracker) {
			const {
				data: { coords }
			} = await axios.get(`/trackers/coords/${tracker.id}`);

			setCoords(parseCoords(coords));
			setTracker(tracker);
			return true;
		}
		return false;
	}

	async function goToMaps() {
		const BASE_URL = 'https://www.google.com/maps/search/?api=1&query=';
		const lng = Number(coords.longitude).toFixed(7);
		const lat = Number(coords.latitude).toFixed(7);
		const RESULT_URL = `${BASE_URL}${lat},${lng}`;

		const supported = await Linking.canOpenURL(RESULT_URL).catch(
			console.error
		);
		if (supported) {
			Linking.openURL(RESULT_URL);
		}
	}

	function getRegion(): Region {
		return {
			...coords,
			latitudeDelta: 0.018,
			longitudeDelta: 0.018
		};
	}

	function parseCoords(coords: Log) {
		return {
			longitude: Number(coords.longitude),
			latitude: Number(coords.latitude)
		};
	}

	function getTrackerImage() {
		switch (tracker?.type) {
			case 'fiets':
				return BicycleImage;
			case 'aanhangwagen':
				return TrailerImage;
			case 'motorfiets':
				return MotorbikeImage;
			case 'scooter':
				return ScooterImage;
			default:
				return BicycleImage;
		}
	}

	useFocusEffect(
		useCallback(() => {
			getCoords();
		}, [route?.params])
	);

	return (
		<View style={styles.mapsContainer}>
			<Text h3 h3Style={{ fontSize: 24 }}>
				🤯 Hier is uw {tracker ? tracker.type : ''} 🤯
			</Text>
			{tracker ? (
				<Text h4 h4Style={{ fontSize: 18, fontWeight: '100' }}>
					{tracker.name}
				</Text>
			) : null}
			<MapView
				provider={'google'}
				style={styles.map}
				region={getRegion()}
			>
				<Marker
					title={'Uw tracker'}
					coordinate={coords}
					image={getTrackerImage()}
				/>
			</MapView>
			<View>
				<Text h4 h4Style={styles.error}>
					{errorMessage}
				</Text>
			</View>
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

const DEFAULT_COORDS: Coords = {
	latitude: 52.335,
	longitude: 4.86
};

const styles = StyleSheet.create({
	mapsContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
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
	},
	error: { fontSize: 18, color: 'red', margin: 8 }
});

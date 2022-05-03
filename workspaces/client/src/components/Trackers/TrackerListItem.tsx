import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import { Coords, Tracker } from '../../../types';
import BicycleAvatarImage from '../../../assets/bicycle_avatar.png';
import TrailerAvatarImage from '../../../assets/trailer_avatar.png';
import MotorbikeAvatarImage from '../../../assets/motorbike_avatar.png';
import ScooterAvatarImage from '../../../assets/scooter_avatar.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TrackerListItem({
	tracker,
	index,
	navigation
}: {
	tracker: Tracker;
	index: number;
	navigation: any;
}) {
	const [expanded, setExpanded] = useState(false);

	function parseDateString(date: string): string {
		if (date === '') {
			return 'Geen datum beschikbaar...';
		}
		const time = new Date(date).toLocaleTimeString('nl-NL').slice(0, 5);
		return `${time} | ${parseDate(date)}`;
	}

	function parseDate(date: string): string {
		const dateObj = new Date(date);
		const dd = dateObj.getDate();
		const mm = dateObj.getMonth() + 1;
		const yyyy = dateObj.getFullYear();

		return `${dd}-${mm}-${yyyy}`;
	}

	function getTypeIcon() {
		switch (tracker.type) {
			case 'fiets':
				return BicycleAvatarImage;
			case 'aanhangwagen':
				return TrailerAvatarImage;
			case 'motorfiets':
				return MotorbikeAvatarImage;
			case 'scooter':
				return ScooterAvatarImage;
			default:
				return BicycleAvatarImage;
		}
	}

	return (
		<ListItem.Accordion
			content={
				<>
					<Avatar
						source={getTypeIcon()}
						size={35}
						rounded
						avatarStyle={styles.avatar}
						containerStyle={{
							marginRight: 8
						}}
					/>
					<ListItem.Content>
						<ListItem.Title style={{ fontWeight: 'bold' }}>
							{tracker.name || `Tracker ${tracker.id}`}
						</ListItem.Title>
						<ListItem.Subtitle>
							Tracker #{index + 1}
							<Text></Text>
						</ListItem.Subtitle>
					</ListItem.Content>
				</>
			}
			isExpanded={expanded}
			onPress={() => setExpanded(!expanded)}
		>
			{expanded ? (
				<>
					{tracker.logs?.map((log: Coords) => (
						<ListItem key={log.date}>
							<ListItem.Title>
								X {log.longitude}, Y {log.latitude}
							</ListItem.Title>
							<ListItem.Subtitle>
								{parseDateString(log.date || '')}
							</ListItem.Subtitle>
						</ListItem>
					))}
					<TouchableOpacity
						onPress={() => navigation.navigate('Maps', { tracker })}
					>
						<ListItem
							key={tracker.id + '-view'}
							style={styles.editContainer}
						>
							<ListItem.Title style={styles.editTitle}>
								View <MaterialIcons name="remove-red-eye" />
							</ListItem.Title>
						</ListItem>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('TrackerEdit', { tracker })
						}
					>
						<ListItem
							key={tracker.id + '-edit'}
							style={styles.editContainer}
						>
							<ListItem.Title style={styles.editTitle}>
								Edit <MaterialIcons name="edit" />
							</ListItem.Title>
						</ListItem>
					</TouchableOpacity>
				</>
			) : null}
		</ListItem.Accordion>
	);
}

const styles = StyleSheet.create({
	avatar: {
		borderWidth: 1,
		borderColor: '#ccc'
	},
	editTitle: {
		textAlign: 'center',
		fontSize: 18,
		width: '100%',
		fontWeight: '600'
	},
	editContainer: {
		borderWidth: 1,
		borderColor: '#ccc'
	}
});

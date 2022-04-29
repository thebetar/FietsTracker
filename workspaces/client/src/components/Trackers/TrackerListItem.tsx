import { useState } from 'react';
import { ListItem, Avatar, Text } from 'react-native-elements';
import { Coords, Tracker } from '../../../types';
import BicycleAvatarImage from '../../../assets/bicycle_avatar.png';

export default function TrackerListItem({
	tracker,
	index
}: {
	tracker: Tracker;
	index: number;
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

	return (
		<ListItem.Accordion
			content={
				<>
					<Avatar
						source={BicycleAvatarImage}
						size={35}
						rounded
						avatarStyle={{
							borderWidth: 1,
							borderColor: '#ccc'
						}}
					/>
					<ListItem.Content>
						<ListItem.Title style={{ fontWeight: 'bold' }}>
							{tracker.name || `Tracker ${tracker.id}`}
						</ListItem.Title>
						<ListItem.Subtitle>
							Tracker #{index + 1}
						</ListItem.Subtitle>
					</ListItem.Content>
				</>
			}
			isExpanded={expanded}
			onPress={() => setExpanded(!expanded)}
		>
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
		</ListItem.Accordion>
	);
}

import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList
} from '@react-navigation/drawer';
import React, { useContext, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { LoginContext } from '../context/LoginContext';

import LoginScreen from './Login';
import MapsScreen from './Maps';
import ProfileScreen from './Profile';
import TrackersScreen from './Trackers';

const Drawer = createDrawerNavigator();

export default function LayoutScreen() {
	const {
		loggedIn,
		actions: { autoLogin, logout }
	} = useContext(LoginContext) as LoginContext;

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<Drawer.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerTitle: 'FietsTracker',
				headerShown: loggedIn,
				headerRight: () => (
					<MaterialIcons
						name="logout"
						size={25}
						style={{ marginRight: 10 }}
						onPress={logout}
					/>
				)
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
		>
			{loggedIn ? (
				<>
					<Drawer.Screen
						name="Maps"
						component={MapsScreen}
						options={{
							drawerIcon: () => (
								<MaterialIcons name="map" size={20} />
							)
						}}
					/>
					<Drawer.Screen
						name="Trackers"
						component={TrackersScreen}
						options={{
							drawerIcon: () => (
								<MaterialIcons name="track-changes" size={20} />
							)
						}}
					/>
					<Drawer.Screen
						name="Profile"
						component={ProfileScreen}
						options={{
							drawerIcon: () => (
								<MaterialIcons name="person" size={20} />
							)
						}}
					/>
				</>
			) : (
				<Drawer.Screen
					name="Login"
					component={LoginScreen}
					options={{
						drawerIcon: () => (
							<MaterialIcons name="login" size={20} />
						)
					}}
				/>
			)}
		</Drawer.Navigator>
	);
}

function CustomDrawer(props: any) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="FietsTracker"
				labelStyle={{
					fontWeight: 'bold',
					fontSize: 18
				}}
				style={{
					borderWidth: 2,
					borderColor: '#333'
				}}
				onPress={() => props.navigation.navigate('Maps')}
				icon={() => <MaterialIcons name="pedal-bike" size={20} />}
			/>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {mapNavigations} from '@/constants/navigations';
import MapHomeScreen from "@/screens/map/MapHomeScreen";

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

/**
 * @title 지도 스크린 Stack navigation
 * */
function MapStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#fff',
                },
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: 'gray',
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: 'black',
            }}
        >
            <Stack.Screen
                name={mapNavigations.MAP_HOME}
                component={MapHomeScreen}
                options={{
                    headerTitle: ' ',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default MapStackNavigator;

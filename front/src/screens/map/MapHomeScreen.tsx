import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useAuth from '../../hooks/queries/useAuth';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { useUserLocation } from '@/hooks/useUserLocation';
import { usePermission } from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 * @title 맵이 표출되는 스크린
 *
 * @author 정휘학
 * @since 2024.05.22
 * */
type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  // 모바일 상단에 대한 변수
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  // 지도 ref
  const mapRef = useRef<MapView | null>(null);
  // 로그아웃 api
  const { logoutMutation } = useAuth();
  // 현재 사용자 위치 가져오는 hook
  const { userLocationS, isUserLocationErrorS } = useUserLocation();
  // 권한 체크 hook
  const { checkingPermission } = usePermission('LOCATION');

  // 로그아웃 핸들러
  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  // 내 위치 이동 핸들러
  const handlePressUserLocation = async () => {
    await checkingPermission();
    if (isUserLocationErrorS) {
      // 에러 표시
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocationS?.latitude,
      longitude: userLocationS?.longitude,
      longitudeDelta: 0.0421,
      latitudeDelta: 0.0922,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
      />
      <Pressable
        style={[styles.drawerButton, { top: (inset.top || 20) + 20 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name={'menu'} color={colors.WHITE} size={25} />
      </Pressable>
      <Pressable
        style={[styles.drawerButton, { top: (inset.top || 50) + 70 }]}
        onPress={handleLogout}
      >
        <Text>로그아웃</Text>
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable
          style={styles.mapButton}
          onPress={handlePressUserLocation}
        >
          <MaterialIcons
            name={'my-location'}
            color={colors.WHITE}
            size={25}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;

import { useEffect } from 'react';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import { permissionAlerts } from '@/constants';

// 권한 타입
type PermissionType = 'LOCATION' | 'PHOTO';

// OS 권한 타입
type PermissionOSType = {
  [key in PermissionType]: Permission;
};

// 안드로이드 권한 타입
const androidPermissions: PermissionOSType = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};
// IOS 권한 타입
const iosPermissions: PermissionOSType = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};
/**
 * @title 권한 체크 요청에 관련된 hook
 * */
export const usePermission = (type: PermissionType) => {
  const checkingPermission = async () => {
    const isAndroid = Platform.OS === 'android';
    const permissionOS = isAndroid
      ? androidPermissions
      : iosPermissions;

    const checked = await check(permissionOS[type]);

    const showPermissionAlert = () => {
      Alert.alert(
        permissionAlerts[`${type}_PERMISSION`].TITLE,
        permissionAlerts[`${type}_PERMISSION`].DESCRIPTION,
        [
          {
            text: '설정하기',
            onPress: () => Linking.openSettings(),
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ],
      );
    };

    switch (checked) {
      case RESULTS.DENIED:
        if (isAndroid) {
          showPermissionAlert();
          return;
        }
        await request(permissionOS[type]);
        break;
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
        showPermissionAlert();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (async () => {
      await checkingPermission();
    })();
  }, []);

  return { checkingPermission };
};

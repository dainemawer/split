import { Platform, NativeModules } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { supabase } from '../lib/supabase';

export const collectDeviceInfo = async () => {
  try {
    const deviceInfo = {
      platform: Platform.OS,
      platformVersion: Platform.Version,
      deviceName: Device.deviceName,
      deviceModel: Device.modelName,
      deviceYear: Device.deviceYearClass,
      deviceType: Device.deviceType,
      osVersion: Device.osVersion,
      osBuildId: Device.osBuildId,
      manufacturer: Device.manufacturer,
      isDevice: Device.isDevice,
      brand: Device.brand,
      designName: Device.designName,
      productName: Device.productName,
      deviceMemory: Device.totalMemory,
      supportedCpuArchitectures: Device.supportedCpuArchitectures,
    };

    const { status } = await Location.requestForegroundPermissionsAsync();
    let locationInfo = null;

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      locationInfo = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        country: geocode[0]?.country,
        region: geocode[0]?.region,
        city: geocode[0]?.city,
        postalCode: geocode[0]?.postalCode,
        timezone: geocode[0]?.timezone,
      };
    }

    // Update profile with device and location info
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          device_info: deviceInfo,
          location_info: locationInfo,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
    }

    return { deviceInfo, locationInfo };
  } catch (error) {
    console.error('Error collecting device info:', error);
    return null;
  }
};

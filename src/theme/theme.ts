import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
    error: '#B00020',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    disabled: '#757575',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF6D00',
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

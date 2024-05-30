import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '@/constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  isValid?: boolean;
}

const deviceHeight: number = Dimensions.get('screen').height;
/* Component */
function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  isValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={isValid}
      style={({ pressed }) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        isValid && styles.isValid,
      ]}
      {...props}
    >
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

/* StyleSheet */
const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  isValid: {
    opacity: 0.5,
  },
  filled: {
    // backgroundColor: colors.PINK_700,
    backgroundColor: "#D72638",
  },
  outlined: {
    // borderColor: colors.PINK_700,
    borderColor: "#D72638",
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 10 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 10 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomButton;

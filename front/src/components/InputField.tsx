import React, { ForwardedRef, forwardRef, useRef } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';

/**
 * @title input 공통 컴포넌트
 *
 * @author 정휘학
 * @since 2024.05.23
 * */

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight: number = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {
      disabled = false,
      error,
      touched = false,
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    // TextInput ref
    const textInputRef = useRef<TextInput | null>(null);
    // ===========================================================================
    // 에러를 표출하는 Text 영역을 클릭해도 TextInput focus 핸들링 해주는 hook
    // ===========================================================================
    const handlePressInput = () => {
      textInputRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}
        >
          <TextInput
            ref={ref ? mergeRefs(ref, textInputRef) : textInputRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize={'none'}
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.textError}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  textError: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;

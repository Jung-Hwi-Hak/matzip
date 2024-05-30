import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';

/**
 * @title 로그인 스크린
 *
 * @author 정휘학
 * @since 2024.05.21
 * */

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const formHook = useForm({
    initValue: { email: '', password: '' },
    validate: validateLogin,
  });

  const { loginMutation } = useAuth();

  const handleSubmit = () => {
    loginMutation.mutate(formHook.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder={'이메일'}
          error={formHook.errors.email}
          inputMode={'email'}
          touched={formHook.touched.email}
          returnKeyType={'next'}
          autoFocus
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...formHook.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder={'비밀번호'}
          error={formHook.errors.password}
          touched={formHook.touched.password}
          secureTextEntry
          returnKeyType={'join'}
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...formHook.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label={'로그인'}
        variant={'filled'}
        size={'large'}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;

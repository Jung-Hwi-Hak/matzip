import React, {useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import {validateSignup} from '@/utils';
import useAuth from "@/hooks/queries/useAuth";

function SignupScreen() {
    const passwordRef = useRef<TextInput | null>(null);
    const passwordConfirmRef = useRef<TextInput | null>(null);
    const formHook = useForm({
        initValue: {email: '', password: '', passwordConfirm: ''},
        validate: validateSignup,
    });

    const {signupMutation, loginMutation} = useAuth();

    const handleSubmit = () => {
        const {email, password} = formHook.values;
        signupMutation.mutate({email, password}, {
            onSuccess: (response) => {
                loginMutation.mutate({email, password})
            }
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField
                    placeholder={'이메일'}
                    error={formHook.errors.email}
                    touched={formHook.touched.email}
                    inputMode={'email'}
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
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    textContentType={'oneTimeCode'}
                    onSubmitEditing={() => passwordConfirmRef.current?.focus()}
                    {...formHook.getTextInputProps('password')}
                />
                <InputField
                    ref={passwordConfirmRef}
                    placeholder={'비밀번호 확인 '}
                    error={formHook.errors.passwordConfirm}
                    touched={formHook.touched.passwordConfirm}
                    secureTextEntry
                    returnKeyType={'done'}
                    blurOnSubmit={false}
                    textContentType={'oneTimeCode'}
                    onSubmitEditing={handleSubmit}
                    {...formHook.getTextInputProps('passwordConfirm')}
                />
            </View>
            <CustomButton
                label={'회원가입'}
                variant={'filled'}
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

export default SignupScreen;

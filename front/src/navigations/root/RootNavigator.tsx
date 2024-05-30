import React, {useEffect} from 'react';
import useAuth from "@/hooks/queries/useAuth";
import SplashScreen from 'react-native-splash-screen'
import MainDrawerNavigator from "@/navigations/drawer/MainDrawerNavigator";
import AuthStackNavigator from "@/navigations/stack/AuthStackNavigator";

/**
 * @title 사용자가 초기에 보여지고 사용하는 Navigator 스크린
 *
 * @author 정휘학
 * @since 2024.05.22
 * */
function RootNavigator() {
    const {isLogin, isLoginLoading} = useAuth();

    useEffect(() => {
        if (!isLoginLoading) {
            setTimeout(() => {
                SplashScreen.hide();
            }, 500)
        }
    }, [isLoginLoading]);

    return (
        <>
            {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator/>}
        </>
    );
}

export default RootNavigator;

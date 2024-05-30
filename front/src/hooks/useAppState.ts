import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/**
 * @title 앱 상태 파악하는 hook ( 백그라운드, 포그라운드 ... )
 * */
export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(
    appState.current,
  );
  const [isComeBack, setIsComeBack] = useState<boolean>(false);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          setIsComeBack(true);
        }

        if (
          appState.current.match(/active/) &&
          nextAppState === 'background'
        ) {
          setIsComeBack(false);
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    isComeBack,
    appStateVisible,
  };
};

import { useEffect, useState } from 'react';

interface UseFormProps<T> {
  initValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

/**
 * @title 공통 form hook
 *
 * @params { initValue, validate } initValue : form 초기 데이터 ( {email: ... , ...} ) / validate : form 유효성검사 함수
 * */
function useForm<T>({ initValue, validate }: UseFormProps<T>) {
  // form value 를 담는 state
  const [values, setValues] = useState(initValue);
  // form blur 상태를 담는 state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // form error value 를 담는 state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ===========================================================================
  // input form 값 변경에 대한 handle hook
  // ===========================================================================
  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };
  // ===========================================================================
  // form focus 가 풀릴 경우 해당 touched state 에 해당 form value 를 true 로 바꾸는 hook
  // ===========================================================================
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  // ===========================================================================
  // Input 공통 컴포넌트에 필요한 기본적인 hook 들을 return 하는 hook
  // ===========================================================================
  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) =>
      handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return { value, onChangeText, onBlur };
  };
  // ===========================================================================
  // 각 form 의 값이 변경이 될때
  // ===========================================================================
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, touched, getTextInputProps, errors };
}

export default useForm;

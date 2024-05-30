type UserInfomationType = {
  email: string;
  password: string;
};

// ===================================================
// 회원의 기본적인 form validate hook - email, password
// ===================================================
function validateUser(values: UserInfomationType) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

// ===================================================
// 로그인  form validate hook - email, password
// ===================================================
function validateLogin(values: UserInfomationType) {
  return validateUser(values);
}

// ===================================================
// 회원가입  form validate hook - email, password, passwordConfirm
// ===================================================
function validateSignup(
  values: UserInfomationType & { passwordConfirm: string },
) {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '' };
  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

export { validateLogin, validateSignup };

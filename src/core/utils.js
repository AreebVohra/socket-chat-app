export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const phoneValidator = phone => {
  const re = /[+][9][2][0-9]\d{9}/;
  
  if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';
  if (!re.test(phone)) return 'Ooops! We need a valid Phone number.';

  return '';
};
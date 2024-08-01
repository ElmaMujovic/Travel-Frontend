export const regexName = /^[A-ZŽŠĆČĐa-zžšćčđ.,\s]{1,25}$/;

export const regexSurname = /^[A-ZŽŠĆČĐa-zžšćčđ.,\s]{1,25}$/;

export const regexEmail =
  /^[a-zA-Z0-9!?._-]{2,60}@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const regexPhone = /^\d{10}|[0-9]{10,11}$/;

export const regexLocation = /^[A-Za-z\s0-9]{2,100}$/;


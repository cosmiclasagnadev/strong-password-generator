export const passwordGenerator = (length: any) => {
  if (isNaN(length)) {
    throw new Error("Please input a number.");
  }
  if (length > 25) {
    throw new Error(
      "It is recommended you don't use a password longer than 25 characters."
    );
  }
  const symbols = "!@#$%^&*()_+";
  const alphanumeric =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
    password += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
    password = password.slice(0, length);
  }
  return password;
};

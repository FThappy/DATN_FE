/** Băm gmail thành chuỗi hợp lệ có thể thành tên nút trên firebase */
export const hashGmail = (gmail: string) => {
  return gmail.replace(/[.#$[\]]/g, '_');
};

/** Kiểm tra tính hợp lệ của một địa chỉ gmail */
export const checkValidGmail = (gmail: string) => {
  const gmailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  return gmailRegex.test(gmail);
};

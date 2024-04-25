/** Kiểm tra tính hợp lệ của số điện thoại */
export const checkValidPhoneNumber = (phoneNumber: string) => {
  const phonePattern = /^0\d{9,10}$/

  return phonePattern.test(phoneNumber)
}

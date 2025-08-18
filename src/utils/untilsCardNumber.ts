export const checkValidCard = (card: string) => {
  const cardPattern = /^\d{16}$/;

  return cardPattern.test(card);
};

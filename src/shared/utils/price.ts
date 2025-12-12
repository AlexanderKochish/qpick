export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-EN').format(price)
}

export const calculateFinalPrice = (price: number, discount?: number) => {
  if (!discount) return price
  return price * (1 - discount / 100)
}

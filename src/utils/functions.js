export const getAbbreviationAddress = (address) => {
  if (!address || address.length < 42)
    return ''
  return `${address.substring(0, 6)}...${address.substring(38, 42)}`
}

export const shorttenString = (str) => {
  if (!str) return str;
  return str.length > 31 ? str.slice(0, 28) + "..." + str.slice(-3) : str;
};
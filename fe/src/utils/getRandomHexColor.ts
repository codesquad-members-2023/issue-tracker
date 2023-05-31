const MAX_HEX_COLOR = 16777215;
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * MAX_HEX_COLOR).toString(16)}`;
};

export default getRandomHexColor;

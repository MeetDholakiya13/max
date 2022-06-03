export const regExs = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  fullName:
    /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/,
  phone: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[.]?[\s]?[0-9])+$/,
  positiveNumber: /^[1-9]+[0-9]*$/,
};

// Secret keys for encryption
export const secretKeys = {
  AUTH: "authUser",
  LANGUAGE_DATA: "languageData",
};

// Local storage keys
export const localKeys = {
  AUTH: "authUser",
  LANGUAGE_DATA: "languageData",
};

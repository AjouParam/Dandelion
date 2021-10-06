const colors = {
  white: '#ffffff',
  black: '#000000',
  grey_0: '#d5d5d5',
  grey_1: '#a6a6a6',
  red: '#e84118',
  blue: '#3679fe',
  green: '#9CD3C8',
  main: '#F3D737',
};

export const theme = {
  background: colors.white,
  text: colors.black,
  errorText: colors.red,
  rightText: colors.green,

  // Image Component
  imageBackground: colors.grey_0,
  imageButtonBackground: colors.grey_1,
  imageButtonIcon: colors.white,

  // Input Component
  label: colors.grey_1,
  inputPlaceholder: colors.grey_1,
  inputBorder: colors.grey_1,
  inputDisabledBackground: colors.grey_0,

  // Button Component
  buttonBackground: colors.main,
  buttonDisabledBackground: colors.grey_0,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.main,
  buttonLogout: colors.red,

  // Navigation
  headerTintColor: colors.black,
  tabActiveColor: colors.main,
  tabInactiveColor: colors.grey_1,

  // Spinner
  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,

  // List
  listBorder: colors.grey_0,
  listTime: colors.grey_1,
  listDescription: colors.grey_1,
  listIcon: colors.black,

  // GiftedChat
  sendButtonActivate: colors.main,
  sendButtonInactivate: colors.grey_1,

  // SmallButton Component
  abledText: colors.main,
  disabledText: colors.grey_0,
  abledBorder: colors.main,
  disabledBorder: colors.grey_0,
};

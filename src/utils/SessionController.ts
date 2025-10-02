import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_KEY = 'userToken';


export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
    return token !== null;
  } catch (error) {
    return false;
  }
};

export const saveUserToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_KEY, token);
  } catch (error) {}
};

export const getUserToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_TOKEN_KEY);
  } catch (error) {
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
  } catch (error) {}
};

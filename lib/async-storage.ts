import AsyncStorage from "@react-native-async-storage/async-storage";

/** Non-sensitive key-value storage (banners dismissed, tooltips seen, etc.) */

export async function getItem(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function getBoolean(key: string): Promise<boolean> {
  const value = await AsyncStorage.getItem(key);
  return value === "true";
}

export async function setBoolean(key: string, value: boolean): Promise<void> {
  await AsyncStorage.setItem(key, value ? "true" : "false");
}

import EncryptStorage from 'react-native-encrypted-storage';

// =============================================================================
// EncryptStorage 아이템 추가하기
// =============================================================================
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptStorage.setItem(key, JSON.stringify(data));
};
// =============================================================================
// EncryptStorage 아이템 가져오기
// =============================================================================
const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};
// =============================================================================
// EncryptStorage 아이템 삭제하기
// =============================================================================
const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) {
    await EncryptStorage.removeItem(key);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };

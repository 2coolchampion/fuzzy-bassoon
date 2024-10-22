export const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting localStorage item:", err);
    }
  };

  const getItem = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (err) {
      console.error("Error getting localStorage item:", err);
    }
  };

  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error("Error removing localStorage item:", err);
    }
  };

  return { getItem, setItem, removeItem };
};

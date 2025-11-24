import { storeItemKey, getItem, removeItem } from './AsyncStorage'; // Import your secureStorage methods

// Custom storage for redux-persist using your secure storage implementation
const secureStorage = {
    setItem: (key, value) => {
        return storeItemKey(key, value); // Store item securely
    },
    getItem: (key) => {
        return getItem(key); // Retrieve item securely
    },
    removeItem: (key) => {
        return removeItem(key); // Remove item securely
    }
};

export default secureStorage;

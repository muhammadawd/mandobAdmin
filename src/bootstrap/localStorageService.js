const checkStorage = key => {
  if (window.localStorage.getItem(key)) {
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (e) {
      window.localStorage.removeItem(key)
      throw e
    }
  } else {
    return null
  }
}

const saveToStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const getFromStorage = (key) => window.localStorage.getItem(key)

const clearAllStorage = (key) => window.localStorage.removeItem(key)

export default {
  checkStorage,
  clearAllStorage,
  getFromStorage,
  saveToStorage
}

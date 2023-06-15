import { useLayoutEffect, useState } from "react";


const useLocalStorage = <T>(name: string) => {
  const [state, setState] = useState<T>();

  useLayoutEffect(() => {
    /**
     * 'cause next render all pages in the server side, window will not be available so
     * just before render view in client side, we get the cached data 
     */
    if (window) setState(JSON.parse(localStorage.getItem(name) || "{}"))
  }, [])

  return {
    save: (values: T) => {
      localStorage.setItem(name, JSON.stringify(values || {}))
      setState(values)
    }, read: () => state
  }
}

export {
  useLocalStorage
}
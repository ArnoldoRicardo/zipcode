import { useState, useEffect } from 'react'

export interface Item {
  countryCode: string
  code: string
}

export const useHistorySearch = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const addItems = (item: Item) => {
    if (items.length > 4) {
      const tail = ([_, ...items]: [Item]) => items
      const newItems = [...tail(items), item]
      setItems(newItems)
    } else {
      const newItems = [...items, item]
      setItems(newItems)
    }
  }

  const clear = () => setItems([])
  return { items, addItems, clear }
}

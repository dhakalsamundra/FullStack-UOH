import { useState } from 'react'

export const useToggle = () => {
  const [isHidden, setIsHidden] = useState(true)

  const toggleHidden = () => {
    setIsHidden(!isHidden)
  }
  return { value: isHidden, setValue: toggleHidden }
}

export const useFeild = (type) => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const clear = () => {
    setValue('')
  }

  const loginService = { type, onChange, clear }
  return [value, loginService]
}

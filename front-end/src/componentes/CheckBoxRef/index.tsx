import { useEffect, useRef, InputHTMLAttributes } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

/**
 * This example renders one checkbox. If you want to render multiple options,
 * check the other checkbox example, or adapt this one.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */

interface Props {
  name: string
  label?: string
  value?: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export default function Checkbox({ name, value, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name)
  

  //const defaultChecked = defaultValue === false

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path:'checked',

      /*getValue: ref => {
        return ref.current.checked
        
      },*/
      /*clearValue: ref => {
        
        ref.current.checked = defaultChecked
      },
      setValue: (ref, value) => {
        ref.current.checked = value
      },*/
      
      
    })

   
  }, [fieldName, registerField])

  return (
    <div>
      <input
        ref={inputRef}
        defaultChecked={defaultValue}
        type="checkbox"
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  )
}



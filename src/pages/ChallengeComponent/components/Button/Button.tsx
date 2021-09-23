import React, { ReactElement } from 'react'

import './Button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function List(props: Props): ReactElement {
  return (
    <button {...props} className={`button ${props.className}`}>
      {props.children}
    </button>
  )
}

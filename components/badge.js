import React from 'react'

export default function Badge({ children, className }) {
  return (
    <span
      className={`bg-violet-100 text-violet-700 rounded-sm py-1 px-2 ${
        className ? className : ''
      }`}
    >
      {children}
    </span>
  )
}

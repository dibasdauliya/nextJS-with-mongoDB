import React from 'react'

export default function FlexParagraph({ children }) {
  return <p className='flex gap-1 flex-wrap justify-between'>{children}</p>
}

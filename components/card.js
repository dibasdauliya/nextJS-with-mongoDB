import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Badge from './badge'

export default function Card({ image, title, price, link }) {
  return (
    <Link href={link || '/'}>
      <a className='card p-3 rounded-sm border border-gray-300 w-80 hover:border-violet-600'>
        <Image
          src={image || 'https://unsplash.it/300'}
          width={400}
          height={400}
          objectFit='contain'
          alt=''
        />
        <div className='mt-2'>
          <h2 className='text-xl mb-2 font-semibold'>
            {title || 'Lorem ipsum dolor sit amet.'}
          </h2>
          <Badge>Price: ${parseInt(price).toLocaleString() || '4,545'}</Badge>
        </div>
      </a>
    </Link>
  )
}

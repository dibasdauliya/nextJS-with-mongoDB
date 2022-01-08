import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from './container'
import SearchOverlay from './searchOverlay'

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (typeof document !== undefined) {
      if (showSearch == true) {
        document?.body.classList.add('overflow-y-hidden')
      } else {
        document?.body.classList.remove('overflow-y-hidden')
      }
    }
  }, [showSearch])
  return (
    <div className={`shadow`}>
      <Container>
        <nav className='flex flex-wrap items-center gap-4 justify-between'>
          <div className='flex gap-8 items-center'>
            <Link href='/' passHref={true}>
              <a className='font-semibold text-2xl'>
                <span className='text-violet-700' title='Dev.to and MongoDB'>
                  DM
                </span>{' '}
                Store
              </a>
            </Link>
            <input
              type='text'
              placeholder='Search'
              className='px-4 py-2 w-auto lg:w-72 border border-gray-300'
              onFocus={() => setShowSearch(true)}
              onChange={(e) => setShowSearch(e.target.value)}
            />
          </div>
          <ul className='flex gap-4'>
            <li>
              <a
                href='/#winter-packs'
                className='hover:bg-violet-700 hover:text-white px-3 py-2 rounded-sm'
              >
                Winter Packs
              </a>
            </li>
            <li>
              <a
                href='/#all-products'
                className='hover:bg-violet-700 hover:text-white px-3 py-2 rounded-sm'
              >
                All Products
              </a>
            </li>
            <li>
              <Link href='/orders'>
                <a>View Orders</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      {showSearch && (
        <SearchOverlay handleClick={(val) => setShowSearch(val)} />
      )}
    </div>
  )
}

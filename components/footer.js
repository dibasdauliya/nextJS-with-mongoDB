import React from 'react'
import { FaArrowUp, FaGithub } from 'react-icons/fa'
import Badge from './badge'
import Container from './container'
import OutLink from './outLink'

export default function Footer() {
  return (
    <footer className='border-t border-gray-300'>
      <Container>
        <div className='p-1 lg:p-4 flex justify-center flex-wrap gap-3 mb-5'>
          <OutLink link='https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m'>
            <Badge>Project for MongoDB Atlas Hackathon on DEV</Badge>
          </OutLink>

          <OutLink link='https://vercel.com/'>
            <Badge> Hosted on Vercel</Badge>
          </OutLink>
        </div>
        <div className='flex gap-4 flex-wrap justify-between'>
          <p>
            <span className='font-semibold'>DM Store</span>{' '}
            {new Date().getFullYear()}. Developed by{' '}
            <OutLink link='https://twitter.com/dibasdauliya33'>
              Dibas Dauliya
            </OutLink>
            .
          </p>
          <p className='flex gap-4'>
            <OutLink link='https://github.com/dibasdauliya'>
              <span className='flex items-center gap-2'>
                <FaGithub /> GitHub
              </span>
            </OutLink>
            <button
              onClick={() =>
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                })
              }
            >
              <span className='flex items-center gap-2'>
                <FaArrowUp /> Back to Top
              </span>
            </button>
          </p>
        </div>
      </Container>
    </footer>
  )
}

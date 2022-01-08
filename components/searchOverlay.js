import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const Items = ({ title, slug, category, description, highlights }) => {
  let newTitle, newDescription
  highlights.forEach((highlight) => {
    if (highlight.path == 'title') {
      newTitle = highlight.texts
        .map(({ value, type }) => {
          if (type === 'hit') {
            return `<mark class='bg-violet-700 text-white'>${value}</mark>`
          } else {
            return value
          }
        })
        .join('')
    } else if (highlight.path == 'description') {
      newDescription = highlight.texts
        .map(({ value, type }) => {
          if (type === 'hit') {
            return `<mark class='bg-violet-700 text-white'>${value}</mark>`
          } else {
            return value
          }
        })
        .join('')
    }
  })
  return (
    <li className='bg-violet-50'>
      <Link href={`/${category.split(' ').join('-').toLowerCase()}/${slug}`}>
        <a
          className='px-3 pt-2 text-violet-700 font-semibold w-full inline-block hover:underline'
          dangerouslySetInnerHTML={{ __html: newTitle || title }}
        />
      </Link>
      <p
        className='p-3'
        dangerouslySetInnerHTML={{ __html: newDescription || description }}
      />
    </li>
  )
}

export default function SearchOverlay({ handleClick }) {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        handleClick(false)
      }
    })
  })

  async function handleOnChange(e) {
    setQuery(e.target.value)

    if (e.target.value.length > 3) {
      try {
        const { data } = await axios.get(`/api/search?term=${e.target.value}`)
        setData(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    // console.log(data)
  }

  return (
    <div className='bg-black bg-opacity-90 absolute inset-0 z-30 flex justify-center pt-24'>
      <button
        title='Close'
        className='flex justify-center items-center p-2 bg-violet-200 text-violet-600 absolute right-4 top-4 w-10 h-10 opa rounded-full cursor-pointer'
        onClick={() => handleClick(false)}
      >
        <FaTimes />
      </button>
      <div className='w-9/12'>
        <input
          type='text'
          className='w-full rounded-sm p-2 bg-violet-50 outline-none border-transparent border-2 focus:border-violet-600 focus:ring-violet-600 placeholder-slate-400'
          placeholder='Type your query (at least 4 word)'
          autoFocus={true}
          onChange={(e) => handleOnChange(e)}
        />
        {query.length > 3 && (
          <ul className='bg-gray-500 gap-[3px] grid my-4 overflow-y-scroll max-h-96'>
            {data?.map(
              ({ title, description, category, slug, _id, highlights }) => (
                <Items
                  key={_id}
                  title={title}
                  description={description}
                  category={category}
                  slug={slug}
                  highlights={highlights}
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

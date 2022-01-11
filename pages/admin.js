import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from '../components/container'
import { convertDocToObj } from '../utils/db'
import { getAllUsers } from '../utils/getData'

const Orders = ({
  idx,
  category,
  image,
  slug,
  title,
  quantity,
  price,
  _id,
  id,
  delivered
}) => {
  const [isDelivered, setDelivered] = useState({})

  useEffect(() => {
    setDelivered((prev) => ({ ...prev, [idx]: delivered }))
  }, [])

  async function handleDeliver(mainID, productID, index) {
    setDelivered((prev) => ({ ...prev, [index]: !isDelivered[index] }))

    try {
      const { data } = await axios.put('/api/users/updateDelivery', {
        mainID,
        productID
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex gap-4 p-3 border border-gray-300 rounded-sm'>
      <Link href={`/${category.split(' ').join('-').toLowerCase()}/${slug}`}>
        <a>
          <Image
            width={100}
            height={100}
            src={image}
            className='object-cover rounded-sm'
          />
        </a>
      </Link>
      <div className='grid gap-1 self-start'>
        <Link href={`/${category.split(' ').join('-').toLowerCase()}/${slug}`}>
          <a className='hover:underline font-semibold max-w-[18ch] lg:max-w-[60ch]'>
            {title}
          </a>
        </Link>
        <span className='font-semibold'>Quantity: {quantity}</span>
        <span className='font-semibold'>
          Price: ${(quantity * price).toLocaleString() || ''}
        </span>
      </div>
      <form className='ml-auto flex  items-start'>
        <label htmlFor='tick'>Mark as Delivered</label>
        <input
          type='checkbox'
          id='tick'
          className='inline-block p-8 w-6 h-6 ml-3'
          checked={isDelivered[idx]}
          onChange={() => handleDeliver(_id, id, idx)}
        />
      </form>
    </div>
  )
}

export default function Admin({ data }) {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Container>
        <header className='my-12 text-center'>
          <h1 className='text-3xl font-bold'>Admin Panel</h1>
          <strong>Total User(s): {data?.length}</strong>
        </header>
        {data?.map(({ address, email, name, orderItems, _id }) => (
          <main className='border border-gray-200 p-3 my-4' key={_id}>
            <div className='mb-4'>
              <ul className='font-semibold'>
                <li>Name: {name}</li>
                <li>Email: {email}</li>
                <li>Location: {address}</li>
              </ul>
            </div>
            <h2 className='text-2xl font-bold'>Orders</h2>

            <div className='grid gap-5 my-6'>
              {orderItems?.map(
                (
                  {
                    title,
                    image,
                    price,
                    quantity,
                    slug,
                    category,
                    id,
                    delivered
                  },
                  idx
                ) => {
                  return (
                    <Orders
                      title={title}
                      image={image}
                      price={price}
                      quantity={quantity}
                      slug={slug}
                      category={category}
                      id={id}
                      delivered={delivered}
                      _id={_id}
                      idx={idx}
                      key={id}
                    />
                  )
                }
              )}
            </div>
          </main>
        ))}
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const data = await getAllUsers()
  return {
    props: { data: data.map((data) => convertDocToObj(data)) }
  }
}

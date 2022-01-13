import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Container from '../components/container'
import Footer from '../components/footer'
import { convertDocToObj } from '../utils/db'
import { formatDate } from '../utils/formatDate'
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
  delivered,
  date
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
      <div className='grid gap-1 self-start font-semibold'>
        <Link href={`/${category.split(' ').join('-').toLowerCase()}/${slug}`}>
          <a className='hover:underline text-base lg:text-xl'>{title}</a>
        </Link>
        <span>Quantity: {quantity}</span>
        <span>Price: ${(quantity * price).toLocaleString() || ''}</span>
        <span>Ordered at: {formatDate(date) || ''}</span>
      </div>
      <form className='ml-auto flex items-start flex-shrink-0'>
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
          <h1 className='text-3xl font-bold mb-2'>Admin Panel</h1>
          <strong>Total User(s): {data?.length}</strong>
        </header>
        <section className='min-h-[60vh]'>
          {data?.map(({ address, email, name, orderItems, _id }) => (
            <main
              className='border border-gray-300 p-3 my-4 rounded-sm'
              key={_id}
            >
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
                      date,
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
                        date={date}
                      />
                    )
                  }
                )}
              </div>
            </main>
          ))}
        </section>
      </Container>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  /* Giving access to all in this demo, but I would check session.user.email. Then if it is my email, I would give access to the page, otherwise I would redirect to the login page. */

  // const session = await getSession(context)

  // if (session?.user) {
  //   const { email } = session?.user
  //   if (
  //     email !== "myemail"
  //   ) {
  //     return { redirect: { destination: '/auth/signin', permanent: false } }
  //   }
  // } else {
  //   return { redirect: { destination: '/auth/signin', permanent: false } }
  // }

  const data = await getAllUsers()
  return {
    props: { data: data.map((data) => convertDocToObj(data)) }
  }
}

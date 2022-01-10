import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'
import Badge from '../components/badge'
import Container from '../components/container'
import FlexParagraph from '../components/flexParagraph'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import { getUserData } from '../utils/getData'

export default function Orders({ user }) {
  const { email, name, address, orderItems } = user.user

  const [data, setData] = useState(orderItems || '')

  async function handleDelete(idd) {
    const filter = data.filter(({ id }) => id !== idd)
    setData(filter)
    try {
      const { data } = await axios.put('/api/users/deleteData', {
        orderItems: filter,
        email: 'dev@example.com'
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Order(s)</title>
      </Head>
      <Navbar />

      <Container>
        <Link href='/'>
          <a className='inline-block mt-8'>
            <Badge className='flex gap-2 items-center'>
              <FaArrowLeft /> Go to Home
            </Badge>
          </a>
        </Link>
        <section className='grid grid-cols-1 lg:grid-cols-[minmax(0,75%),25%] mb-12 gap-10 min-h-[50vh]'>
          <main className='mt-8'>
            <h1 className='text-2xl lg:text-3xl mb-10 font-bold'>Order(s)</h1>

            <div className='grid gap-5'>
              {data[0] !== null && data.length ? (
                data?.map(
                  ({ title, image, price, quantity, slug, category, id }) => (
                    <div
                      key={id}
                      className='flex gap-4 p-3 border border-gray-300 rounded-sm'
                    >
                      <Link
                        href={`/${category
                          .split(' ')
                          .join('-')
                          .toLowerCase()}/${slug}`}
                      >
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
                        <Link
                          href={`/${category
                            .split(' ')
                            .join('-')
                            .toLowerCase()}/${slug}`}
                        >
                          <a className='hover:underline font-semibold max-w-[18ch] lg:max-w-[60ch]'>
                            {title}
                          </a>
                        </Link>
                        <span className='font-semibold'>
                          Quantity: {quantity}
                        </span>
                        <span className='font-semibold'>
                          Price: ${(quantity * price).toLocaleString() || ''}
                        </span>
                      </div>
                      <button
                        onClick={(_) => handleDelete(id)}
                        className='ml-auto flex justify-center items-center p-2 text-violet-700 bg-violet-100 self-start rounded-full w-12 h-12'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )
                )
              ) : (
                <div className='font-semibold'>It's Lonely Here! </div>
              )}
            </div>
          </main>
          <aside className='self-start'>
            <div className='border border-violet-600 p-3 w-94 mt-4'>
              <h3 className='font-semibold text-xl mb-2'>Your Details</h3>
              <div className='grid gap-2'>
                <FlexParagraph>
                  <span>Name:</span>
                  <span>{name}</span>
                </FlexParagraph>
                <FlexParagraph>
                  Email:
                  <span>{email}</span>
                </FlexParagraph>
                <FlexParagraph>
                  Location:
                  <span>{address}</span>
                </FlexParagraph>
              </div>
            </div>
          </aside>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const data = await getUserData()

  return {
    props: {
      user: data
    }
  }
}

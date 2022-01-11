import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaArrowLeft, FaCheck, FaHome } from 'react-icons/fa'
import Badge from '../../components/badge'
import Container from '../../components/container'
import FlexParagraph from '../../components/flexParagraph'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import Product from '../../models/Products'
import { connect, convertDocToObj, disconnect } from '../../utils/db'
import { getProducts } from '../../utils/getData'
import { v4 as uuidv4 } from 'uuid'
import Head from 'next/head'

export default function Slug({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { title, category, slug, image, price, availableQty, description } =
    JSON.parse(product)

  const order = {
    title,
    quantity,
    image,
    price,
    slug,
    category,
    id: uuidv4(),
    delivered: false
  }

  async function sendOrder() {
    setLoading(true)

    try {
      const { data } = await axios.put('/api/users/addData', {
        orderItems: [order],
        email: 'dev@example.com'
      })

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
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
        <section className='grid grid-cols-1 lg:grid-cols-[minmax(0,75%),25%] mb-12 gap-10'>
          <main className='mt-8'>
            <h1 className='text-2xl lg:text-3xl mb-10 font-bold'>{title}</h1>
            <Image
              className='rounded-sm'
              width={450}
              height={450}
              src={image}
              // layout='responsive'
              objectFit='contain'
            />
            <p className='mt-10 text-base lg:text-xl'>{description}</p>
          </main>
          <aside className='self-start'>
            <div className='border border-violet-600 rounded-sm p-3 w-94'>
              <h3 className='font-semibold text-xl mb-2'>Checkout</h3>
              <div className='grid gap-2'>
                <FlexParagraph>
                  <span>Price per piece:</span>
                  <span>${parseInt(price).toLocaleString()}</span>
                </FlexParagraph>
                <FlexParagraph>
                  Quantity:
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(availableQty).keys()].map((num) => (
                      <option value={num + 1} key={num}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </FlexParagraph>
                <FlexParagraph>
                  Payment type:
                  <span>Cash On Delivery</span>
                </FlexParagraph>
                <FlexParagraph>
                  Total:
                  <span>${(parseInt(price) * quantity).toLocaleString()}</span>
                </FlexParagraph>
              </div>

              {success ? (
                <button className='block w-full mt-4 focus:outline-none'>
                  <Badge className='flex gap-4 rounded-sm justify-center items-center bg-green-100 text-green-700'>
                    <FaCheck /> Order Sent Successfully
                  </Badge>
                </button>
              ) : (
                <button
                  className='block w-full mt-4 focus:outline-none'
                  onClick={sendOrder}
                >
                  <Badge className='flex gap-4 rounded-sm justify-center items-center'>
                    <FaHome /> {loading ? 'Sending...' : 'Send Order'}
                  </Badge>
                </button>
              )}
            </div>

            <div className='border border-violet-600 rounded-sm p-3 w-94 mt-4'>
              <h3 className='font-semibold text-xl mb-2'>Your Details</h3>
              <div className='grid gap-2'>
                <FlexParagraph>
                  <span>Name:</span>
                  <span>Developer</span>
                </FlexParagraph>
                <FlexParagraph>
                  Email:
                  <span>dev@example.com</span>
                </FlexParagraph>
                <FlexParagraph>
                  Location:
                  <span>Internet</span>
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

export async function getStaticPaths() {
  const { data } = await getProducts()

  const paths = data?.map(({ category, slug }) => ({
    params: { category: category.split(' ').join('-').toLowerCase(), slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { slug, category } = params

  await connect()
  const product = await Product.findOne({ slug }).lean()

  await disconnect()
  return {
    props: {
      product: JSON.stringify(product)
    },
    revalidate: 2
  }
}

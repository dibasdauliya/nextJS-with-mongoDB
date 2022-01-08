import Head from 'next/head'
import Image from 'next/image'
import CardSection from '../components/cardSection'
import Container from '../components/container'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import { getFilteredProducts } from '../utils/getData'
import src from '../public/img/unsplash.jpg'

export default function Home({ winterData, allData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />

      <main className='h-2/5 relative mb-12'>
        <div className='w-full h-96 overflow-hidden'>
          <Image
            width='2500px'
            height='384px'
            layout='fixed'
            src={src}
            alt=''
            className='object-cover overflow-hidden'
            placeholder='blur'
            priority={true}
          />
        </div>
        <div className='overflow-hidden absolute inset-0 h-full bg-black bg-opacity-20'>
          <div className='container max-w-[1300px] mx-auto p-3 flex flex-col justify-center h-full'>
            <h1 className='text-white text-4xl lg:text-5xl font-bold'>
              <span className='text-violet-600'>DM</span> Store - All In One
            </h1>{' '}
            <p className='text-white mt-4 text-xl lg:text-xl max-w-3xl'>
              Hoodie? Jacket? Scarf? Shoes? Shocks? We got you covered!
            </p>
          </div>
        </div>
      </main>
      <Container>
        <CardSection title='Winter Packs' data={winterData} />
        <CardSection title='All Products' data={allData} />
      </Container>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const data = await getFilteredProducts()

  // console.log(data)

  const winterData = data.filter(
    ({ category }) => category.toLowerCase() === 'winter'
  )
  const allData = data.filter(
    ({ category }) => category.toLowerCase() !== 'winter'
  )

  return {
    props: { winterData, allData }
  }
}

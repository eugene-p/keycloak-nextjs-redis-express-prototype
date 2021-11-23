import React, {FC, useCallback, useEffect, useState} from 'react'
import AuthLayout from '@components/AuthLayout'
import { GetStaticProps } from 'next'
import Map from '@components/Map'
import Feature from 'ol/Feature'
import Collection from 'ol/Collection'

type IndexPageProps = {
  env: any
}
const IndexPage:FC<IndexPageProps> = (props) => {
  const getVehicles = useCallback(async (): Promise<string> => {
    try {
      const res = await fetch(`http://${props.env.API_HOST}:${props.env.API_PORT}/vehicles`)
      const resText = await res.text()
      return resText
    } catch (error) {
      console.log(error)
      return ''
    }
  }, [])

  const [cars, setCars] = useState<string>()
  useEffect(() => {
    const timer=setInterval(() => {
      getVehicles().then(
        c => setCars(c)
      )
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  return (
    <AuthLayout title="Demo | Map">
      <Map cars={cars} />
    </AuthLayout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      env: {
        API_PORT: process.env.API_PORT
        , API_HOST: process.env.API_HOST
      }
    }
  }
}

export default IndexPage

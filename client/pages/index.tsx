import React, {FC, useEffect} from 'react'
import AuthLayout from '@components/AuthLayout'
import { GetStaticProps } from 'next'
import Map from '@components/Map'
import {setApi, setAccesssToken} from '@slice/Env'
import { useAppDispatch } from '@state/hooks'

import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'

type IndexPageProps = {
  env: any
}

const IndexPage:FC<IndexPageProps> = (props) => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>()
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setApi(props.env))
  }, [])

  useEffect(() => {
    dispatch(setAccesssToken(keycloak?.token))
  }, [initialized, keycloak?.token])

  return (
    <AuthLayout title="Prototype | Map">
      <Map />
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

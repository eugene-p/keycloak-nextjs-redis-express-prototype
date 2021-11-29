import React, { FC } from 'react'
import Head from 'next/head'
import Footer from '@components/Footer'
import Header from '@components/Header'

import style from './style/Layout.module.css'

export interface LayoutProps {
  title?: string
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = 'yp-proto'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' href='/img/arrow-up.svg' />
    </Head>
    <div className={style.container}>
      <Header />
      <div className={style.main}>{children}</div>
      <Footer />
    </div>
  </div>
)

export default Layout

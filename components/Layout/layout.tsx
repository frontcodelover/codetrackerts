import Nav from './nav'
import Footer from './footer'

export default function Layout({ children}: any ) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
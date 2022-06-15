import Nav from "./nav";
import Footer from "./footer";

//* Layout commun à tout le site

export default function Layout({ children }: any) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

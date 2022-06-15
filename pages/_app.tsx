import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { AuthContexProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/protectRoutes/ProtectedRoute";

const noAuthReqired = ["/", "/login", "/signup"];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <AuthContexProvider>
      {noAuthReqired.includes(router.pathname) ? (
      <Layout>
        <Component {...pageProps} />
      </Layout>
      ) : (
          <ProtectedRoute>
             <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
        )}
    </AuthContexProvider>
  );
}

export default MyApp;

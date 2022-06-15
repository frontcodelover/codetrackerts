import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

//* Le composant ProtectedRoute permet de protéger une route

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;

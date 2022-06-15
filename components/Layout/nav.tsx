import React from "react";
import Link from "next/link";
import { auth } from "../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

//* Navigation du site

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="top-0 z-50 bg-white">
      <div className="layout flex h-14 items-center justify-between">
        <div className="lg:container mx-auto">
          <nav className="w-full flex py-6">
            <Link href="/">
              <div className="logo text-2xl font-semibold basis-1/4 flex cursor-pointer">
                <span className="font-semibold">Code</span>
                <span className="font-bold text-purple-600">Tracker</span>
              </div>
            </Link>
            <ul className="list-none basis-3/4 flex justify-end font-semibold">
              {user ? (
                <>
                  <li className="px-6 text-lg cursor-pointer">
                    <a
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                    >
                      Se déconnecter
                    </a>
                  </li>
                  <li className="px-6 text-lg cursor-pointer">
                    <a
                      onClick={() => {
                        router.push("/user/dashboard");
                      }}
                    >
                      Mes projets
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-6 text-lg">
                    <Link href="/login">Se connecter</Link>
                  </li>
                  <li className="px-6 text-lg">
                    <Link href="/signup">S&apos;inscrire</Link>
                  </li>
                </>
              )}
              <li className="px-6 text-lg">A quoi ça sert ?</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

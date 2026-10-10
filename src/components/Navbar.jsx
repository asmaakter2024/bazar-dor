"use client";
import { useEffect, useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar({ categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [categories, setCategories] = useState([]);

  const router = useRouter();

  const { data: session } = authClient.useSession();
  //console.log(session);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };
  // useEffect(() => {
  //   fetch(`${baseUrl}/categories`)
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data))
  //     .catch((err) => console.log(err));
  // }, []);
  //console.log(categories);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Image
                className="bg-green-600 rounded-3xl"
                src="/logo-icon.png"
                alt="bazar dor"
                width={30}
                height={30}
                priority
              />
              <span className="text-2xl font-bold text-black-700">
                বাজার দর
              </span>
            </div>
            <span className="text-xs text-neutral-500">{date}</span>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {categories?.map((cat) => (
            <li key={cat?.id}>
              <Link href={`/category/${cat?.slug}`}>
                <span>{cat?.icon}</span>
                {cat?.nameBn}
              </Link>
            </li>
          ))}

          {session?.user && (
            <li>
              {" "}
              <Link href="/profile">Profile</Link>
            </li>
          )}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          {session?.user ? (
            <>
              <Button onClick={handleSignOut}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">Login</Link>
              <Link href="/sign-up">
                <Button>Sign UP</Button>
              </Link>
            </>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 font-medium text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              <Link href="#" className="block py-2">
                Login
              </Link>
              <Button className="w-full">Sign Up</Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

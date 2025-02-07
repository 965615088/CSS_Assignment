"use client";
import { useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const EscapeKeyContext = createContext();

export const EscapeKeyProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <EscapeKeyContext.Provider value={{}}>
      {children}
    </EscapeKeyContext.Provider>
  );
};

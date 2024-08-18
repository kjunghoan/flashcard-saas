import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcard SaaS",
  description: "A SaaS for creating flashcards from your text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <Container
            maxWidth="xl"
            style={{
              background: `linear-gradient(
                              90deg,
                              rgba(2,0,47,1) 0%,
                              rgba(54, 61, 166, 1) 38 %,
                              rgba(196, 196, 255, 1) 100 %)`
            }}>
            {children}
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}

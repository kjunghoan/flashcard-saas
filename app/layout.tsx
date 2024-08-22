import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
            maxWidth="xl" style={{ paddingBottom: "50px" }}
            >
            {children}
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}

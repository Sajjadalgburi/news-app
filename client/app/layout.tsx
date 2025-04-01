import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Header/Navbar";
import CustomApolloProvider from "@/components/CustomApolloProvider";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { UserProvider } from "@/context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Network - Stay Informed with the Latest Trending Articles",
  description:
    "News Network is the go-to platform for news enthusiasts. Explore trending articles across various categories, leave comments, and engage in discussions. Our AI feature provides article summaries, bias ratings, and a worthiness score to help you make informed reading choices.",
  keywords: [
    "News",
    "Trending News",
    "Latest Articles",
    "News Network",
    "AI Summarized News",
    "Bias Rating",
    "News Comments",
    "Worthy News",
    "Breaking News",
    "Current Events",
  ],
  openGraph: {
    title: "News Network - Stay Informed with the Latest Trending Articles",
    description:
      "Discover the latest news, trending articles, and insightful discussions. Use AI-powered summaries, bias ratings, and worthiness scores to optimize your reading experience.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "News Network",
    images: [
      {
        url: "https://cdn-icons-png.flaticon.com/512/21/21601.png", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "News Network - Stay Informed",
      },
    ],
    type: "website",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomApolloProvider>
          <UserProvider token={token?.value ?? undefined}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange>
              <Navbar />
              {children}
              <Toaster position="top-center" />
            </ThemeProvider>
          </UserProvider>
        </CustomApolloProvider>
      </body>
    </html>
  );
}

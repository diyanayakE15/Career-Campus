import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/Career Compass Logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by <a href="https://github.com/diyanayakE15/Career-Campus" target="_blank">HackPack</a>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/bhushanchavan06/" target="_blank">Bhushan Chavan</a> |   
                  <a href="https://www.linkedin.com/in/diya-nayak6151/" target="_blank"> Diya Nayak</a> |   
                  <a href="https://www.linkedin.com/in/shreyas-kaushik/" target="_blank"> Shreyas Prajapati</a>  
              </p>

              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "by Kartic",
  description: "A react-based components created by Kartic"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col max-w-xl mx-auto  min-h-svh px-6 py-8 gap-8">
            {/* <Navbar /> */}
            <main>
              {children}
            </main>
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <p className="text-muted-foreground text-sm">© 2025 Kartic</p>
              <p className="text-muted-foreground text-sm">A project by <a href="https://x.com/intent/user?screen_name=01_kartic" target="_blank" className="text-primary font-semibold underline underline-offset-3 hover:text-chart-1">Kartic</a></p>
            </div>
          </div>
          <Toaster
            toastOptions={{
              classNames: {
                toast: "min-h-12 border rounded-xl [&>div]:w-full",
              },
            }}
            position="bottom-right"
            richColors
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

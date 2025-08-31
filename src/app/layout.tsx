import { Toaster } from "react-hot-toast";
import { AppProgressBar } from "@siamf/next-progress";
import type { Metadata } from "next";
import "./globals.css";

//Fonts
import { inter, noto_sans } from "@/fonts";

//TRPC Provider
import TRPCProvider from "@/trpc/TRPCProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Personal Movie and Book Collection",
    default: "Flimybook | Personal Movie and Book Collection"
  }
}

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${noto_sans.variable} font-sans`}>
        <Toaster
          containerStyle={{
            zIndex: 9999999999
          }}
        />
        <AppProgressBar
          color="#FF9500"
          height={4}
          showSpinner={false}
          zIndex={999999}
          delay={250}
        />
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}

export default RootLayout;
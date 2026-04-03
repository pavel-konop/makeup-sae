import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Mitaa Makeup | Certified MUA Jakarta–Bekasi | make.up_sae",
  description:
    "Book Mitaa — certified makeup artist serving Jakarta & Bekasi. Natural elegant looks for weddings, parties, photoshoots, prom & everyday glam. WhatsApp only.",
  openGraph: {
    title: "Mitaa Makeup | Certified MUA Jakarta–Bekasi",
    description:
      "Natural elegant looks for weddings, parties, photoshoots, prom & everyday glam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}

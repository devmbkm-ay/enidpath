import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "EnidPath International | UK Higher Education Partner",
  description:
    "EnidPath International is an authorised recruitment partner of Online Business School (UK). Access affordable BA and MBA pathway programmes for less than £6,000 with full student support.",
  keywords: [
    "UK education",
    "MBA pathway",
    "BA pathway",
    "Online Business School",
    "Uganda",
    "international students",
    "OFQUAL",
    "QCF",
    "accredited programmes",
    "affordable UK degrees",
  ],
  authors: [{ name: "EnidPath International" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}

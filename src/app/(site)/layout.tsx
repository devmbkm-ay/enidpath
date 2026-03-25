import { Layout as SiteLayout } from "@/components/Layout";
import { Providers } from "@/components/Providers";

export const dynamic = "force-dynamic";

export default function SiteLayoutGroup({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}

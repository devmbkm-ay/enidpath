import { Layout as SiteLayout } from "@/components/Layout";
import { Providers } from "@/components/Providers";

export default function SiteLayoutGroup({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <SiteLayout>{children}</SiteLayout>
    </Providers>
  );
}

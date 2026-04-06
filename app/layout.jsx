import "./globals.css";
import { ToastHost } from "@/components/ui/toast-host";
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_TITLE } from "@/config/branding";

export const metadata = {
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  keywords: [
    "Fundraise",
    "founder investor platform",
    "startup funding",
    "venture capital",
    "raise capital",
  ],
  openGraph: {
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ToastHost />
      </body>
    </html>
  );
}

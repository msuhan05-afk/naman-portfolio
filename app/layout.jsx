import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Nav from "@/components/Nav";
import Splash from "@/components/Splash";

export const metadata = {
  title: "Naman Mehra — HCI Designer & Creative Technologist",
  description:
    "HCI designer and creative technologist working across product, XR and physical interfaces. Currently MSc HCI at UCA, London.",
  openGraph: {
    title: "Naman Mehra",
    description:
      "HCI designer & creative technologist — product, XR and physical interfaces.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const setInitialTheme = `
  (function() {
    try {
      var s = localStorage.getItem('theme');
      var p = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', s || p);
    } catch(e) { document.documentElement.setAttribute('data-theme', 'dark'); }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Splash />
        <Grain />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

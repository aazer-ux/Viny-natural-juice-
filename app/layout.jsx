import './globals.css'

export const metadata = {
  title: "Viny Natural Juice - Jus Naturels Artisanaux",
  description: "Jus naturels artisanaux 100% naturels pressés à froid sans conservateurs. Baobab, Corossol, Cassimago, Ananas-Gingembre. Livraison à Douala, Cameroun.",
  keywords: ["jus naturel", "jus artisanal", "Douala", "Cameroun", "baobab", "corossol", "cassimago", "ananas", "gingembre", "pressé à froid", "100% naturel"],
  authors: [{ name: "Viny Natural Juice" }],
  creator: "Viny Natural Juice",
  publisher: "Viny Natural Juice",
  metadataBase: new URL('https://viny-natural-juice.vercel.app'),
  openGraph: {
    title: "Viny Natural Juice - Jus Naturels Artisanaux",
    description: "Jus naturels artisanaux 100% naturels pressés à froid sans conservateurs. Livraison à Douala, Cameroun.",
    url: 'https://viny-natural-juice.vercel.app',
    siteName: 'Viny Natural Juice',
    locale: 'fr_CM',
    type: 'website',
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Viny Natural Juice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Viny Natural Juice - Jus Naturels Artisanaux",
    description: "Jus naturels artisanaux 100% naturels pressés à froid sans conservateurs. Livraison à Douala, Cameroun.",
    images: ['/images/logo.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: [
      { url: '/icons/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/apple-touch-icon-167x167.png', sizes: '167x167', type: 'image/png' },
      { url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Viny Juice',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#2d5016',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#2d5016',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Viny Juice',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2d5016" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Viny Juice" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2d5016" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('SW registered: ', registration);
                    },
                    function(err) {
                      console.log('SW registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

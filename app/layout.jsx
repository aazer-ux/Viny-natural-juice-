import './globals.css'

export const metadata = { title: "Viny Natural Juice" }

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
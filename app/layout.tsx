import './globals.css'

export const metadata = {
  title: 'Canal del Río | Tu canal, tu comunidad, nuestra voz',
  description:
    'Noticias, información, deportes y programas del Canal del Río.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
import './globals.css' 

export const metadata = {
  title: 'Estudo Global Solution',
} 

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
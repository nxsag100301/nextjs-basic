'use client'
import '../app/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import AppNavBar from './components/app.navbar';
import AppFooter from './components/app.footer';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container-main">
          <AppNavBar />
          <Container className="container-content">
            {children}
          </Container>
          <div className="container-footer">
            <AppFooter />
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  )
}

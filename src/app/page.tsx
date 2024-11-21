import type { Metadata } from 'next'
import '@/styles/app.scss'
import AppPage from './components/app.page'

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Description test',
}

export default function Home() {

  return (
    <main>
      <div className='app-container'>
        <AppPage />
      </div>
    </main>
  )
}

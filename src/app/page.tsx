import Footer from '@/widgets/footer/footer'
import Header from '@/widgets/header/header'
import Title from '@/widgets/title/title'

export default function Home() {
  return (
    <div className="container">
      <div className="layout">
        <Header />
        <main className="main">
          <Title />
        </main>
        <Footer />
      </div>
    </div>
  )
}

import Link from "next/link"

const Home = () => {
  return (
  <>
    <div>THis is like the home page or whaetver so like go to this page  but be warned if u not logged in u wull have to log in</div>
    <button><Link href="/user">User Page I hope ur logged in :P</Link></button>
  </>
  )
}

export default Home
import Link from "next/link"
import {redirect} from 'next/navigation';
import {getSession, logout} from './lib'

export default async function Home() {
  const session = await getSession();
  let button;
  if(!session){
    button = "Login"
  }else{
    button = "Logout"
  }
  return (
  <>
    <div>
      <form className="home-div" action={async (formdata) => {
          'use server';
          await logout();
          redirect('/login/');
        }}>
          <h1>JWT Practice Homepage</h1>
          {(session)? <Link href="/user" className="userpage-btn"><button type="button">User Page</button></Link> : <p>Login to view the user page.</p>}
          <button type='submit'>{button}</button>
        </form>
    </div>
    
  </>
  )
}
import {redirect} from 'next/navigation';
import {getSession, logout} from '../lib';
import Link from "next/link";

export default async function User() {
  const session = await getSession();
  if(!session) redirect("/login");
  let user = session?.user
  return (
    <div className='user-data'>
      <h1>Welcome {user.first_name} to your userpage</h1>
      <h2>Email&#58; {user.email}</h2>
      <h2>Gender&#58; {user.gender}</h2>
      <h2>Favorite Color&#58; {user.fav_color}</h2>
      <h3>Job&#58; {user.job}</h3>
      <p>Your password is &#39;{user.password}&#39; and your IP adress is &#39;{user.ip_address}&#39;</p>

      <form action={async (formdata) => {
        'use server';
        await logout();
        redirect('/');
      }}>
        <Link href="/" className="userpage-btn"><button type="button">Home</button></Link>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}
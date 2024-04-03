import {redirect} from 'next/navigation';
import {getSession, logout} from '../lib'

export default async function User() {
  const session = await getSession();
  if(!session) redirect("/");
  let user = session?.user
  return (
    <div>
      <h1>Welcome {user.name} to the endless nightmare bruv</h1>
      <h2>{user.email}</h2>
      <p>Youre password is '{user.password}' I am inside your walls</p>

      <form action={async (formdata) => {
        'use server';
        await logout();
        redirect('/');
      }}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}
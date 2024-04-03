import {redirect} from 'next/navigation';
import {getSession, login, logout} from '../lib'

export default async function User() {
  const session = await getSession();
  let user = session?.user
  return (
    <div>
      <h1>Welcome {user.name} to the endless nightmare bruv</h1>
      <h2>{user.email}</h2>
      <p>Youre password is &#39;{user.password}&#39; I am inside your walls</p>
    </div>
  )
}
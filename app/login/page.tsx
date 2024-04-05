import {redirect} from 'next/navigation';
import {getSession, login} from '../lib'
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();
  return (
    <section>
      <form className='login-form' action={async (formdata) => {
        'use server';
        await login(formdata);
        if(!session){
          redirect('/');
        }else{
          redirect('/home/');
        }
      }}>
        <h1>JWT Example Login</h1>
        <input type="email" name='email' id='email' required placeholder='Username'/>
        <input type="password" name='password' id='password' required placeholder='Password'/>
        <div>
          <button type='submit'>Login</button>
          <Link href='/' className='link-btn'><button type='button'>Home</button></Link>
        </div>
      </form>
      <h6>PLZ NOTE THE USERNAME IS NOT &#34;john@doe&#34; AND THE PASSWORD IS NOT &#34;johndoe&#34;</h6>
    </section>
  )
}
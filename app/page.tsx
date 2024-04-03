import {redirect} from 'next/navigation';
import {getSession, login} from './lib'

export default async function Home() {
  const session = await getSession();
  return (
    <section>
      <form action={async (formdata) => {
        'use server';
        await login(formdata);
        if(!session){
          redirect('/');
        }else{
          redirect('/home/');
        }
      }}>
        <input type="email" name='email' id='email' />
        <input type="password" name='password' id='password' />
        <button type='submit'>Login</button>
      </form>

      <h1>PLZ NOTE THE USERNAME IS NOT &#34;john@doe&#34; AND THE PASSWORD IS NOT &#34;johndoe&#34;</h1>
    </section>
  )
}
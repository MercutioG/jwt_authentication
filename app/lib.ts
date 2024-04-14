import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import data from "./data";

// Make secret
const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

// Encrypt your data
export async function encrypt(payload: any){
  return await new SignJWT(payload)
  .setProtectedHeader({alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('50 sec')
  .sign(key)
}

// Decrypt your data
export async function decrypt(input: string) : Promise<any> {
  const {payload} = await jwtVerify(input, key, {algorithms : ['HS256']});
  return payload;
}

export async function login(formData: FormData) {
  // Get the email and password from the form data
  const email = formData.get("email");
  const password = formData.get("password");

  // Find the user in the data array
  const user = data.find((user) => user.email === email && user.password === password);

  // If user exists, create session
  if (user) {
    const expires = new Date(Date.now() + 50 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if(!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if(!session) return;

  // Refresh the session so it doesn't expir
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 50 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true
  });
  return res;
}
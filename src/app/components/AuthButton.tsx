'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button className="bg-blue-500 p-2 rounded-md" onClick={() => signIn()}><p className="text-white">Se connecter</p></button>
      ) : (
        <>
          <p>Bienvenue, {session?.user?.name}  {session?.user?.email}</p>
          <button className="bg-red-500 p-2 rounded-md" onClick={() => signOut()}><p className="text-black">Se déconnecter</p></button>
        </>
      )}
    </div>
  );
} 
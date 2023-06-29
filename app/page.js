'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
  'https://oodbxjicokcxmmclwojn.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZGJ4amljb2tjeG1tY2x3b2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NDQ3ODEsImV4cCI6MjAwMTIyMDc4MX0.RJHxPMDTBwx16ZElgEiOGNesdJac6340SKI5KAtih0k'
)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // (async function getUser() {
    //   const {
    //     data: { session },
    //   } = await supabaseClient.auth.getSession()
    //   console.log(data)
    // })()

    return () => subscription.unsubscribe()
  }, [])

  const getUserId = async () => {
    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('id')
    return profiles
  }

  const insertUserId = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { id: session.user.id },
    ])
  }

  if(session) {
    (async function get() {
      const profiles = await getUserId()
      console.log(profiles)
      if (profiles.length === 0) {
        insertUserId()
      } else {
        return
      }
    })()
  }

  if (!session) {
    return (
      <main className="min-h-screen items-center justify-between p-24">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </main>
    )
  }
  else {
    return (
      <main className="min-h-screen items-center justify-between p-24">
      <div className="menu flex mb-32 grid text-center flex-col lg:mb-0 lg:text-left">
        {/* <a onClick={Slide} */}
        <Link className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          href="/prayer">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Prayer{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>    
        <Link className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          href="/scripture">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Scripture{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>
        <a
          className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Prayer{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
        <a
          className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Topics{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
    )
  }
}

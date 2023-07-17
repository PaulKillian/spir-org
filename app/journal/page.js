'use client';
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { getThoughts } from '../components/getThoughts'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://oodbxjicokcxmmclwojn.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZGJ4amljb2tjeG1tY2x3b2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NDQ3ODEsImV4cCI6MjAwMTIyMDc4MX0.RJHxPMDTBwx16ZElgEiOGNesdJac6340SKI5KAtih0k'
)

export default function Journal() {
  const [text, setText] = useState()

  useEffect(() => {
    (async function() {
      const journalThoughts = await getThoughts('journal')
      setText(journalThoughts)
    })()
  }, []);

  const onKeyUpValue = async (e) => {
    if (e.key === 'Meta') {
      const { data, error } = await supabase
      .from('journal')
      .insert([
        { text: e.target.value }
      ])
    }
  }

  return (
    text
    ?
    <>
      <div className='flex justify-center'>
        {text.map((journalText, index) => (
          <div key={index} className='w-5/12 justify-center rounded-lg border drop-shadow-md bg-slate-400 divide-y-4 divide-slate-400/25 m-5'>
            <h1 className='text-white p-10'>{journalText}</h1>
          </div>
          
        ))}
      </div>
      <div className='flex justify-center'>
        <textarea id='area' className='w-4/5 p-5 text-2xl font-semibold'
          onKeyUp={onKeyUpValue}>
        </textarea>
      </div>
    </>
    :
    <textarea id='area' className='h-screen w-screen p-10 text-2xl font-semibold'
        onKeyUp={onKeyUpValue}>
      </textarea>
  )
}

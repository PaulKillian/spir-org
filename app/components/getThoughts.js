import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://oodbxjicokcxmmclwojn.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZGJ4amljb2tjeG1tY2x3b2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NDQ3ODEsImV4cCI6MjAwMTIyMDc4MX0.RJHxPMDTBwx16ZElgEiOGNesdJac6340SKI5KAtih0k'
)

export const getThoughts = async(table) => {
  const { data, error } = await supabase
  .from(table)
  .select()

  const thoughts = []
  await data.map(function(fetched) {
    if (table === 'prayer') {
      thoughts.push({ 
        id: fetched.id, 
        need: fetched.need, 
        nVerse: fetched.nVerse,
        reason: fetched.reason, 
        rVerse: fetched.rVerse,
        glory: fetched.glory, 
        gVerse: fetched.gVerse 
      })
    } else if (table === 'journal') {
      thoughts.push(fetched.text.toString())
    }
  })

  return thoughts
}
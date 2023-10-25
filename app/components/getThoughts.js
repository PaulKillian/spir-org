import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.SUPABASEURL, 
  process.env.SUPABASEAPI
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
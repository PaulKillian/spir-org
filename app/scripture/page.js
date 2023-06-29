'use client';

// export default async function Scripture() {

//   useEffect(() => {
//     (async function getScripture() {
//       const response = await fetch("https://bible-api.com/Genesis 1:1?translation=kjv");
//       const jsonData = await response.json();
//       setScripture(jsonData)
//     })()
//   }, [])
  

//   return (
//     scripture &&
//     <div>
//       <h1>{scripture.reference}</h1>
//       <h1>{scripture.text}</h1>
//     </div>
//   )
// }
// import ReactSearchBox from "react-search-box"
import { useState, useEffect } from 'react'

export default function Scripture(){
  const [scripture, setScripture] = useState()

  const bookSearch = async(e) => {
    const response = await fetch(`https://bible-api.com/${e.item.value}?translation=kjv?verse_numbers=true`);
    const jsonData = await response.json();
    setScripture(jsonData)
  }

  const data = [
    {
      key: "Genesis",
      value: "Genesis",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  return (
    <div className='h-screen w-screen p-10'>
      <ReactSearchBox
        onSelect={bookSearch}
        id='book'
        placeholder="Book"
        value="Doe"
        data={data}
        callback={(record) => console.log(record)}
      />
      {
      scripture &&
      <div>
        <h1>{scripture.reference}</h1>
        <h1>{scripture.text}</h1>
      </div>
      }
    </div>
  );
}


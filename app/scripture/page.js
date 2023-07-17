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


function handleIntersect(entries, observer) {
  console.log (entries, observer)
entries.forEach((entry) => {
 if (entry.intersectionRatio > prevRatio) {
   console.log(entry)
   if (jQuery('.video .et_pb_video_box').length !== 0) {
       jQuery('.video .et_pb_video_box').find('video').prop('muted', true);
       jQuery(".video .et_pb_video_box").find('video').attr('loop', 'loop');
       jQuery(".video .et_pb_video_box").find('video').attr('playsInline', '');

       jQuery(".video .et_pb_video_box").each(function(){
         jQuery(this).find('video').get(0).play()
         jQuery('.video .et_pb_video_box').find('video').removeAttr('controls');
   })
 prevRatio = entry.intersectionRatio;
}
}
})
}

function buildThresholdList() {
let thresholds = [];
let numSteps = 20;

for (let i = 1.0; i <= numSteps; i++) {
 let ratio = i / numSteps;
 thresholds.push(ratio);
}

thresholds.push(0);
return thresholds;
}

function createObserver() {
let observer;

let options = {
 root: null,
 rootMargin: "0px",
 threshold: buildThresholdList(),
};

observer = new IntersectionObserver(handleIntersect, options);
observer.observe(boxElement);
}


window.addEventListener(
"load",
(event) => {
 boxElement = document.querySelector(".video");

 createObserver();
},
false
);
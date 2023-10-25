'use client';
import Image from 'next/image'
import Link from 'next/link';
// import Slide from './components/slide'
import { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import { getThoughts } from '../components/getThoughts'
import { createClient } from '@supabase/supabase-js'
import {Tooltip} from "@nextui-org/tooltip"
import {Button, ButtonGroup} from "@nextui-org/button";
const supabase = createClient(
  'https://oodbxjicokcxmmclwojn.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZGJ4amljb2tjeG1tY2x3b2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NDQ3ODEsImV4cCI6MjAwMTIyMDc4MX0.RJHxPMDTBwx16ZElgEiOGNesdJac6340SKI5KAtih0k'
)
import { Navbar } from '../components/navbar'

export default function Prayer() {
  const [needContent, setNeedContent] = useState()
  const [reasonContent, setReasonContent] = useState()
  const [gloryContent, setGloryContent] = useState()
  const [need, setNeed] = useState([])
  const [addPrayer, setAddPrayer] = useState(false)
  const [session, setSession] = useState(null)
  const [prayerToedit, setPrayerToEdit] = useState(null)

  useEffect(() => {
    (async function() {
      setNeed(await getThoughts('prayer'))
    })()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, []);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  async function getPrayers() {
    let { data: prayer, error } = await supabase
    .from('prayer')
    .select("*")

    .eq('uuid', session.user.id)
    setNeed(prayer)
  }

  if (session) {
    getPrayers()
  }

  const add = () => {
    const need =
      <div className="menu flex mb-32 grid text-center lg:mb-0 lg:text-left group w-fit rounded-lg border border-transparent px-10 m-10 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
        <h1 className={`text-2xl font-semibold text-center`}>The Need</h1>
        <input id='Need' className="m-1 p-1" type="text" name="name" placeholder="Enter name" required />
        <textarea className="m-1 p-1" placeholder="Enter message" name="message" required />
      </div>

    const reason =
      <div className="menu flex mb-32 grid text-center lg:mb-0 lg:text-left group w-fit rounded-lg border border-transparent px-10 m-10 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
        <h1 className={`text-2xl font-semibold text-center`}>The Reason</h1>
        <input id='Reason' className="m-1 p-1" type="text" name="name" placeholder="Enter name" required />
        <textarea className="m-1 p-1" placeholder="Enter message" name="message" required />
      </div>

    const glory = 
      <div className="menu flex mb-32 grid text-center lg:mb-0 lg:text-left group w-fit rounded-lg border border-transparent px-10 m-10 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
        <h1 className={`text-2xl font-semibold text-center`}>The Glory</h1>
        <input id='Glory' className="m-1 p-1" type="text" name="name" placeholder="Enter name" required />
        <textarea className="m-1 p-1" placeholder="Enter message" name="message" required />
      </div>

    setNeedContent(need)
    setReasonContent(reason)
    setGloryContent(glory)
    setAddPrayer(false)
  }

  const editPrayer = async(e) => {
    const prayers = []
    const toBeEdited = []
    const toBeEditedVerses = []

    const id = e.target.id
    const image = document.getElementById(id)
    const prayerNodes = image.parentElement.parentElement.childNodes
    const parsedNodes = [].slice.call(prayerNodes);
    parsedNodes.map(element => {
      element.innerText && prayers.push(element.innerText)
    })
  
    prayers.forEach(element => {
      toBeEdited.push(element.split("\n\n")[0])
      toBeEditedVerses.push(element.split("\n\n")[1])
    })
    console.log(toBeEditedVerses)
  }

  const set = async(e) => {
    e.preventDefault();
    const input = 
      <div className="menu flex mb-32 grid text-center lg:mb-0 lg:text-left group w-fit rounded-lg border border-transparent px-10 m-10 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
        <h1 className={`text-2xl font-semibold`}>The {e.target[0].id}</h1>
        <h2 className={`font-regular`}>{e.target[0].value}</h2>
        <p>{e.target[1].value}</p>
      </div>

    const { data, error } = await supabase
    .from('prayer')
    .insert([
      { 
        uuid: session.user.id,
        id: Math.floor(Math.random() * 10000),
        need: e.target[0].value, nVerse: e.target[1].value,
        reason: e.target[2].value, rVerse: e.target[3].value,
        glory: e.target[4].value, gVerse: e.target[5].value 
      }
    ])

    setAddPrayer(true)
    setNeed(await getPrayers())
  }

  const backgroundChange = (e) => {
    console.log(e)
  }

  return (
    <main>
      <Navbar />
      {/* <Image className='-z-50'
        src={dragon}
        alt="a dragon"
        style={{objectFit: "contain"}}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      /> */}
      {/* <h1 className={'text-2xl font-semibold'}>1 Corinthians 4:20 For the kingdom of God does not consist in words but in power.</h1>
      <h1 className={'text-1xl font-semibold'}>Matthew 7:7 Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you.</h1>
      <h1 className={'text-1xl font-semibold'}>James4:3 When you ask, you do not receive, because you ask with wrong motives, that you may spend what you get on your pleasures.</h1>
      <h1 className={'text-1xl font-semibold'}>Ephesians 1:3 Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.</h1>
      <h1 className={'text-1xl font-semibold'}>Psalm 84:11 For the Lord God is a sun and shield; The Lord gives grace and glory;
        No good thing does He withhold from those who walk uprightly.</h1>
      <h1 className={'text-1xl font-semibold'}>Matthew 7:11 If you then, being evil, know how to give good gifts to your children, how much more will your Father who is in heaven give what is good to those who ask Him!</h1> */}
      <div>
        {need && 
          <div className={'grid grid-cols-3'}>
            {need.map(item => 
            <div key={item.id} id={item.id} className='menu rounded-lg'>
              <div className="menu drop-shadow-lg lg:text-left group max-w-md rounded-lg border border-black px-3 m-3 py-3 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                <Tooltip className={`drop-shadow-lg border font-serif wColor w-72 border nColor px-2 py-3`}
                  content={item.nVerse} 
                  placement= 'top'
                >
                  <div onMouseOver={backgroundChange} className={'flex nColor justify-between p-2 m-1'}>
                    <p className={`text-2xl font-semibold text-center`}>Need</p>
                    <h1 className={`text-1xl font-semibold`}>{item.need}</h1>
                  </div>
                </Tooltip>
                <Tooltip className={`drop-shadow-lg wColor w-72 font-serif px-2 py-3`} 
                  content={item.rVerse} 
                  placement={'top'}
                >
                  <div className={'flex rColor justify-between p-2 m-1'}>
                    <p className={`text-2xl font-semibold text-center`}>Reason</p>
                    <h1 className={`text-1xl font-semibold`}>{item.reason}</h1>
                  </div>
                </Tooltip>
                <Tooltip className={`drop-shadow-lg wColor w-72 font-serif px-2 py-3`} 
                  content={item.gVerse} 
                  placement={'top'}
                >
                  <div className={'flex gColor justify-between p-2 m-1'}>
                    <p className={`text-2xl font-semibold text-center`}>Glory</p>
                    <h1 className={`text-1xl font-semibold`}>{item.glory}</h1>
                  </div>
                </Tooltip>
                <ButtonGroup className={'px-2 py-3 bColor flex justify-around '}>
                  <Button>Notes</Button>
                  <Button>Delete</Button>
                  <Link href="/journal">
                    <Button>Journal</Button>
                  </Link>
                </ButtonGroup>
              </div>
              
            </div>
            )}
          </div>
        }
      </div>
        <div className="items-center p-24">
          <button className={'bg-cyan-500 text-white p-2'} onClick={add} type="submit">Add</button>
          {!addPrayer &&
            <form onSubmit={set} className='flex justify-around'>
              {needContent}
              {reasonContent}
              {gloryContent}
              <button className={'bg-cyan-500 text-white p-2'} type="submit">Set</button>
            </form>
          }
          <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </div>
    </main>
  )
}

import Link from "next/link"

export const Navbar = () => {
  return (
    <div className='flex justify-around'>
      <Link className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href="/scripture">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Scripture{' '}
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
      <Link className="group w-fit rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href="/scripture">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Scripture{' '}
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
    </div>
  )
}

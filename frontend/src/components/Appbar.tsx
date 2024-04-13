import { Link } from "react-router-dom"


export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
        <Link to={'/blogs'}>
        <div className="font-serif text-2xl font-normal cursor-pointer">
            Medium
        </div>
        </Link>
        <div>
            <Link to={'/publish'}>
             <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-10 mb-2">New</button>
            </Link>
            <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="text-md font-extralight text-gray-600 dark:text-gray-300">D</span>
            </div>
       </div>
    </div>
  )
}

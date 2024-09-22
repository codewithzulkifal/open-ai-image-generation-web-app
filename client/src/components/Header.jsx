import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import DarkMode from './DarkMode'

const Header = () => {
  return (
    <>
    <div className=" w-full flex flex-row justify-between items-center px-4 py-3 sm:px-8 bg-white dark:bg-gray-950 dark:text-white shadow-md ">
        <div>
        <Link to="/">
        <img src={logo} alt="Logo" className='w-24' />
        </Link>
        </div>

        <div className=' flex space-x-4 items-center '>
            <DarkMode/>
        <Link to="/createpost" className="text-white bg-green-700 hover:bg-green-800 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 active:bg-green-700 " >
        Create post
        </Link>
        
        </div>
    </div> 
    </>
  )
}

export default Header

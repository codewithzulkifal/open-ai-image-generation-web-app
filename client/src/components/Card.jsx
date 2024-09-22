import {download} from '../assets'
import { donwloadImage } from '../utils'

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className=" rounded-xl group relative shadow-md hover:shadow-lg ">
      <img src={photo}  alt={prompt} className=" w-full h-auto object-cover " />

      <div className=" absolute right-0 bottom-0 left-0 max-h-[95%] m-2 p-4 bg-slate-700 hidden group-hover:flex flex-col ">
        <p className=" text-white text-sm overflow-y-auto ">{prompt}</p>
        <div className=" flex justify-between items-center mt-6 gap-2 ">
          <div className="flex items-center gap-2">
            <div className=" h-5 w-5 rounded-full bg-purple-700 flex justify-center items-center font-semibold text-white text-sm ">
              {name[0]}
            </div>
            <p className=" text-white text-sm ">{name}</p>
          </div>
          <button type='button' className=' bg-none ' onClick={() => donwloadImage(_id, photo)} >
            <img src={download} alt="" className=' h-6 w-6 object-contain invert ' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card

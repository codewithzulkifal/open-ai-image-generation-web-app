import { useNavigate} from 'react-router-dom'
import { useState } from 'react'
import  getRandomPrompts  from '../utils/index.js';
import { IoImagesOutline } from "react-icons/io5";


const CreatePost = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name : "",
    prompt: "",
    photo: "",

  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    if( form.prompt && form.photo ){
      setLoading(true)
      try {
        const response = await fetch('/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          }
        })

        await response.json()
  
        navigate("/")
      } catch (error) {
        alert(error) 
      }finally{
        setLoading(false)
      }
    }
      else{
        alert('Please enter prompt  to get an image')
      }
  }

  const generateImage = async() => {
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('/api/v1/dalle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            prompt: form.prompt,
          }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()
        if (!data.photo) {
          console.log("no photo from response")
        }

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})

      } catch (error) {
        console.log(` Error while display image when fetching API ${error}`)
      }
      finally{
        setGeneratingImg(false)
      }
    }
    else{
      alert('Please enter prompt')
    }
  }
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  
  return (
    <>
    <div className=" max-w-7xl mx-auto ">
      <div>
          <h1 className=" font-bold text-3xl text-black dark:text-white "> Create Post </h1>
          <p className=" text-base mt-2 text-gray-500 ">Create imaginating and visually stunning image through openAi</p>
      </div>

        <form className=' mt-14 max-w-3xl ' onSubmit={handleSubmit}>
          <div className=' flex flex-col gap-5 '>
            <div>
            <div className=' flex items-center mb-2 gap-2 '>
              <label htmlFor='name' className=" block text-base text-black dark:text-gray-100  ">
                Your name
              </label>
            </div>
              <input 
                type= "text"
                id= "name"
                name= "name"
                placeholder= "john david"
                value={form.name}
                required
                onChange={handleChange}
                className=" border border-gray-300 dark:border-gray-800 w-full text-base rounded-lg p-2 outline-none "
              />
            </div>


        <div>
          <div className=" flex items-center mb-2 gap-2 ">
            <label htmlFor="prompt" className=" block text-base text-black dark:text-gray-100  ">
              Prompt
            </label>
            
                <button
                type="button"
                onClick={handleSurpriseMe}
                className=" text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md mx-3 active:scale-95 transition-all duration-300 "
                >
                  surprise me
                </button>

            
          </div>
          <input 
            type="text"
            id="prompt"
            name="prompt"
            placeholder=  "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art"
            value={form.prompt}
            required
            onChange={handleChange}
            className=" border border-gray-300 dark:border-gray-800 w-full text-base rounded-lg p-2 outline-none "
          />
        </div>



            <div className=' relative flex justify-center items-center rounded-lg text-sm h-80 w-80 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 '> 
              {
                form.photo ? (
                  <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
                ) : (
                  <IoImagesOutline className=' w-[70%] h-[70%] object-contain opacity-45 '  />
                )
              }
              {
                generatingImg && (
                  <div className=' absolute inset-0 z-0 flex justify-center items-center bg-gray-600 rounded-lg '>
                   <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-green-600" />
                  </div>
                )
              }
            </div>
          </div>

          <div className=' mt-5 flex gap-5 '>
          <button
          type='button'
          onClick={generateImage}
          className=' text-white bg-green-700 text-base rounded-md w-full sm:w-auto px-4 py-2 text-center '
          >
            {
              generatingImg ? "generating..."  : " Generate "
            }
          </button>
          </div>
          <div className=' mt-10 '>
            <p className=' text-sm text-black dark:text-gray-100  '>One image is Created, You also share with the community. </p>
            <button className=' text-white bg-gray-500 text-base rounded-md w-full sm:w-auto px-4 py-2 text-center mt-3 '>
              {
                loading ? " Sharing " : "Share with community"
              }
            </button>

          </div>

        </form>

    </div> 
    </>
  )
}

export default CreatePost

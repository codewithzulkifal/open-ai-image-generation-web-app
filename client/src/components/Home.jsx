import { useEffect, useState } from "react"
import Card from "./Card"

const RenderCards = ({data , title}) => {
  if(data?.length > 0) return data.map((post) => <Card key={post._id} {...post} />)

else{
return (
  <h2 className=" mt-5 font-bold text-xl uppercase text-green-700 "> {title} </h2>
) }
}


const Home = () => {

  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [allPost, setAllPost] = useState('null')
  const [searchResults, setSearchResults] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPost = async() => {
      setLoading(true)
      try {
        const response = await fetch('/api/v1/post', {
          method: "GET",
          headers:{
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const result = response.json()
          setAllPost(result.data.reverse())
        }

      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchPost()
  }, [])

const handleSearchResult = (e) => 
  clearTimeout(searchTimeout)
  setSearchText(e.target.value)
  
setSearchTimeout(
setTimeout(() => {
  const searchResults = allPost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())
  || item.prompt.toLowerCase().includes(searchText.toLowerCase()))

  setSearchResults(searchResults)

}, 500));  

return (
    <>
  <div className=" max-w-7xl mx-auto ">
        <div className="  ">
          <h1 className=" font-bold text-3xl text-black dark:text-white "> The community showcase </h1>
          <p className=" text-base mt-2 text-gray-500 ">Browse through collection of imaginating and visually stunning image through openAi</p>
        </div>

    <div className=" mt-10 ">
       <label htmlFor="search">
        Search post
       </label>
       <input 
            type="text"
            id="search"
            name="search"
            placeholder= "Search post or photos"
            value={searchText}
            onChange= {handleSearchResult}
            className=" border border-gray-300 dark:border-gray-800 w-full text-base rounded-lg p-2 outline-none "
          />
    </div>
    
    <div className="mt-10">
      {
        loading  ? (
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        ) : (
          <>
          {
            searchText && (
              <h3 className=" text-lg text-gray-500  "> Showing result for <span className=" font-semibold text-gray-700 dark:text-gray-400 ">{searchText} </span> </h3>
            )
          }
          </>
        )
      }
    </div>

    <div className=" grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3  ">
      {
        searchText ? (
          <RenderCards 
            data = {searchResults}
            title= "No search result found"
          />
        ) : (
          <RenderCards 
            data = {allPost}
            title= "No Post Found"
          />
        )
      }
    </div>

  </div> 

    </>
  )
}

export default Home

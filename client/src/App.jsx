import './App.css'
import {
  BrowserRouter, Routes, Route 
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home'
import CreatePost from './components/createPost'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Header />
        <main className=' sm:p-8 px-4 py-2 dark:bg-gray-900 dark:text-white w-full min-h-[calc(100vh-10vh)] '>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        </Routes>
        </main>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App

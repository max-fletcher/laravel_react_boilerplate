import PageComponent from '../components/PageComponent'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axios'

const EditPost = () => {

   const { post_id } = useParams()

   const [oldTitle, setOldTitle] = useState('')
   const [oldDescription, setOldDescription] = useState('')
   const [oldCategory, setOldCategory] = useState('')

   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [category, setCategory] = useState('')
   const [allCategories, setAllCategories] = useState([])
   const [error, setError] = useState('')
   const [message, setMessage] = useState('')

   const getCategories = async () => {
      try {
         const response = await axiosClient.get('/categories/index')
         // console.log(response.data.categories)
         setAllCategories(response.data.categories)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   const getPost = async () => {
      try {
         const response = await axiosClient.get(`/posts/show/${post_id}`)

         // console.log(response.data.post)

         setOldCategory(response.data.post.category_id)
         setOldTitle(response.data.post.title)
         setOldDescription(response.data.post.description)

         setCategory(response.data.post.category_id)
         setTitle(response.data.post.title)
         setDescription(response.data.post.description)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   useEffect(() => {
      getPost()
      getCategories()
      // console.log(category, title, description, allCategories);
   }, []);

   const submit_post = async (e) => {
      e.preventDefault()

      try {
         const response = await axiosClient.patch(`/posts/update/${post_id}`, {
            category_id: category,
            title: title,
            description: description
         })

         if(response.status === 200 && response.data.status === 'success'){
            setMessage(response.data.message)
            // CLEAR UP INPUT FIELDS
         }
         // console.log(response.data.categories)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setCategory(oldCategory)
         setTitle(oldTitle)
         setDescription(oldDescription)
         setError(error.response.data.message)
      }
   }

   return (
      <PageComponent title='Edit Post'>

         {message && (
            <div className="bg-green-100 my-3 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
               <div className="flex">
                  <div className="py-1">
                     <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                  </div>
                  <div>
                     <p className="font-bold">Message</p>
                     <p className="text-sm">{message}</p>
                  </div>
               </div>
            </div>)
         }

         {error && (
            <div className="bg-red-100 my-3 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
               <div className="flex">
                  <div className="py-1">
                     <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                  </div>
                  <div>
                     <p className="font-bold">An Error Occured</p>
                     <p className="text-sm">{error}</p>
                  </div>
               </div>
            </div>)
         }

         <form>
            <div className="space-y-12">
               <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Post</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                     Make new post for this dummy project
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
                     <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                           Title
                        </label>
                        <div className="mt-2">
                           <input
                              type="text"
                              name="title"
                              id="title"
                              autoComplete="off"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter Title"
                           />
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                           Select Category
                        </label>
                        <div className="mt-2">
                           <select
                              id="category"
                              name="category"
                              autoComplete="off"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                           >
                              {
                                 allCategories.map((category) => {
                                    return(
                                       <option key={category.id} value={category.id}>{category.category_name}</option>
                                    )}
                                 )
                              }
                           </select>
                        </div>
                     </div>

                     <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                           Description
                        </label>
                        <div className="mt-2">
                           <textarea
                              id="description"
                              name="description"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter Descrition"
                           />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-3">
               <Link to="/" className="rounded-md bg-gray-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                  Back
               </Link>
               <button
                  type="submit"
                  onClick={submit_post}
                  className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  Save
               </button>
            </div>
         </form>
      </PageComponent>
   )
}

export default EditPost
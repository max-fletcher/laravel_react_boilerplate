import { useEffect, useState } from "react"
import axiosClient from "../axios"
import PageComponent from "../components/PageComponent"
import TButton from "../components/core/TButton"

const Dashboard = () => {

   const [posts, setPosts] = useState([])
   const [error, setError] = useState('')

   const getPosts = async () => {
      try {
         const response = await axiosClient.get('/posts/index')
         console.log(response.data.posts)
         setPosts(response.data.posts)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   useEffect(() => {
      getPosts()
   }, []);

   const delete_post = async (post_id) => {
      // console.log("deleted", post_id);
      try {
         const response = await axiosClient.delete(`/posts/delete/${post_id}`, {
            __method: 'DELETE',
         })
         console.log(response.data);
         if(response.status === 200 && response.data.status === 'success'){
            const result = posts.filter(post => post.id !== post_id)
            setPosts(result)
         }
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   return (
      <>
         <PageComponent title='Dashboard'>

            <div className="flex justify-between">
               <h1> Dashboard Content </h1> 
               <TButton to="/create">
                  Create Post
               </TButton>
            </div>

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

            <div className="flex flex-col">
               <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
                     <div className="overflow-hidden">
                     <table className="min-w-full text-left text-sm font-light table-auto">
                        <thead className="border-b font-medium dark:border-neutral-500">
                           <tr>
                              <th scope="col" className="px-3 py-4">#</th>
                              <th scope="col" className="px-3 py-4">Title</th>
                              <th scope="col" className="px-3 py-4">Description</th>
                              <th scope="col" className="px-3 py-4">Comments</th>
                              <th scope="col" className="px-3 py-4">Category</th>
                              <th scope="col" className="px-3 py-4">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {posts.length > 0 && posts.map((post, index) =>
                              <tr key={post.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                                 <td className="px-3 py-4 font-medium">{index+1}</td>
                                 <td className="px-3 py-4">{post.title}</td>
                                 <td className="px-3 py-4">{post.description}</td>
                                 {
                                    post.comments.length > 0 ?
                                    <td className=" px-3 py-4">
                                       <ul className="list-decimal">
                                          {
                                             post.comments.map((comment) => {
                                                return (
                                                   <li key={comment.id}>{comment.comment}</li>
                                                )}
                                             )
                                          }
                                       </ul>
                                    </td>
                                    : 
                                    <td className="px-3 py-4">No Comments Posted Yet</td>
                                 }
                                 <td className="px-3 py-4">{post.category.category_name}</td>
                                 <td className="px-3 py-4">
                                    <div className="flex justify-start">
                                       <TButton to="/edit" add_classes="mx-1">
                                          Edit Post
                                       </TButton>

                                       <TButton color="red" add_classes="mx-1" onclick={() => delete_post(post.id)}>
                                          Delete Post
                                       </TButton>
                                    </div>
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                     </div>
                  </div>
               </div>
            </div>
         </PageComponent>
      </>
   )
}

export default Dashboard
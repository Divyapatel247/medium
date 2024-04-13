import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
  const {id} = useParams()
  const {loading,blog} = useBlog({id:id || ""});

  if(loading){
    return(<>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center items-center">
       <Spinner/>
     </div>
     </>
    )
  }

  return (
    <div>
      <FullBlog blog={blog!}/>    
    </div>
  )
}

import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useBlogs();
    if(loading){
        return(
            <>
            <Appbar/>
            <div className=" flex flex-col items-center justify-center">
             <div className="w-full max-w-xl flex flex-col items-center justify-center">
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
             </div> 
            </div>
            </>
        )
    }
    if(blogs)
  return (<>
     <Appbar/>
    <div className="flex flex-col items-center justify-center">
     <div className="max-w-xl">
    <BlogCard id={1} authorName={"Divya"} title={"Lorem ipsum, divya patel dolor sit amet consectetur adipisicing elit."} content={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam consequuntur corporis, debitis nam architecto, mollitia et cum nesciunt, esse deleniti laudantium ad doloribus neque illo impedit natus iste repudiandae voluptatum!"} publishedDate={"2nd Feb 2024"}/>
    {blogs.map((blog)=><BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={"2nd Feb 2024"}/>)}
    </div> 
    {/* <div className="max-w-xl">
        <BlogCard authorName={"Divya"} title={"Lorem ipsum, divya patel dolor sit amet consectetur adipisicing elit."} content={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam consequuntur corporis, debitis nam architecto, mollitia et cum nesciunt, esse deleniti laudantium ad doloribus neque illo impedit natus iste repudiandae voluptatum!"} publishedDate={"2nd Feb 2024"}/>
    </div> */}
    </div>
    </>
  )
}





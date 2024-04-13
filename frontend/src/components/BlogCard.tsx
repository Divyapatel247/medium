import { Link } from "react-router-dom";

interface BlogCardProps{
    id:number;
    authorName: string;
    title: string;
    content: string;
    publishedDate:string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) =>{
    return(
        <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 p-4 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                   <Avatar  name={authorName}/>
                </div>
            <div className="font-extralight flex justify-center pl-2 text-sm flex-col">
             {authorName}
            </div>
            <div className="font-extralight flex text-center items-center justify-center pl-1.5 pt-0.5">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
               {publishedDate}
            </div>
            </div>
            <div className="text-xl font-semibold pt-2 ">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
            </div>
            <div className=" text-slate-500 text-sm font-thin pt-2">
                {`${Math.ceil(content.length/100)} minutes read`}
            </div>
            {/* <div className="bg-slate-200 h-1 w-full"></div> */}
        </div>
        </Link>
    )
}

const Circle = () =>{
    return(
        <div className="h-1 w-1 rounded-full bg-slate-400"></div>
    )
}

export const Avatar = ({name}:{name:string})=>{
    return(
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-xl font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

    )
}
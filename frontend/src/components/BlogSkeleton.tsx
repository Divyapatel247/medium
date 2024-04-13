export const BlogSkeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse ">
      <div className="border-b h-40 border-slate-200 pb-4 p-4 mx-w-2xl">
        <div className="flex flex-row items-center">
          <div className="h-6 w-6 bg-gray-200 rounded-full  mb-0.5 flex justify-center flex-col"></div>

          <div className="h-2 w-12 mx-1 bg-gray-200 rounded-full  mb-0.5 flex justify-center pl-2 flex-col"></div>

          <div className="h-2 w-12 mx-1 bg-gray-200 rounded-full  mb-0.5 flex justify-center pl-2 flex-col"></div>
        </div>
        <div className="text-xl font-semibold pt-1 ">
          <div className="h-4 bg-gray-200 rounded-full  max-w-xl mb-2.5"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full  max-w-md mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full  max-w-[360px]"></div>

        <div className=" text-slate-500 text-sm font-thin pt-2">
          <div className="h-2 w-12 mx-1 bg-gray-200 rounded-full  mb-0.5 flex justify-center pl-2 flex-col"></div>
        </div>
      </div>
    </div>
  );
};

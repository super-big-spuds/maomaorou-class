export default function CourseTitleLoadingPage() {
  return (
    <div className="flex flex-wrap justify-center relative h-full animate-pulse">
      <div className="flex flex-col px-10 py-5 gap-6 max-w-3xl">
        <p className="text-3xl font-bold"></p>
        <p className=" text-2xl font-bold">關於此課程</p>

        <p className=" animate-bounce">加載中 ...</p>
        <p className=" text-2xl font-bold ">你將會學到什麼?</p>
        <p className=" animate-bounce">加載中 ...</p>
        <p className=" text-2xl font-bold">課程大綱</p>
        <p className=" animate-bounce">加載中 ...</p>
      </div>

      <div className="sticky top-20 flex flex-col  mt-5 w-full  lg:w-1/6 sm:w-1/2 h-full bg-neutral-200 p-3 items-center rounded shadow-xl">
        <div className=" bg-white rounded border p-2 w-4/5 lg:w-full flex flex-col gap-3 ">
          <p className=" text-xl font-bold">課程價格</p>
          <p className=" animate-bounce">加載中 ...</p>
          <p className=" text-2xl ml-3"></p>

          <p className=" text-gray-400 font-xs">最後更新{}</p>
          <p className=" animate-bounce">加載中 ...</p>
        </div>
        <div className=" bg-slate-100 rounded border p-2 w-4/5 lg:w-full flex flex-col gap-3 ">
          <p className=" text-xl font-bold">課程包含</p>
          <p className=" animate-bounce">加載中 ...</p>

          <p className=" text-xl font-bold">適合對象</p>
          <p className=" animate-bounce">加載中 ...</p>
        </div>
      </div>
    </div>
  );
}

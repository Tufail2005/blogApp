import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publisedDate: string;
  id:number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publisedDate,
}: BlogCardProps) => {
  return ( <Link to={`/blog/${id}`}> 
    <div className="p-5 border-b-2 border-slate-200 pb-4  max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="">
          <Avatar name={authorName} />
        </div>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2 ">
          <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
          {publisedDate}
        </div>
      </div>
      <div className="text-xl font-semibold ">
        {title.length > 80 ? title.slice(0, 80) + "..." : title}
      </div>
      <div className="text-md font-thin">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className=" text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 200)} minute(s) read`}
      </div>
    </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
}

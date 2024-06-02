import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border w-screen max-w-screen-md cursor-pointer mb-3">
        <div className="flex">
          <div className="flex justify-center items-center">
            <Avatar name={authorName} />
          </div>
          <div className="font-light pl-2 pr-1">{authorName}</div> .{" "}
          {publishedDate}
        </div>
        <div className="text-2xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-2 pb-2">
          {`${Math.ceil(content.length / 100)} minutes`}
        </div>
      </div>
    </Link>
  );
};



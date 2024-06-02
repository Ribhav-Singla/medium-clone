import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-3">
              Posted on 30th January 2024
            </div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            Author
            <div className="flex gap-3 mt-3 ">
              <div>
                <Avatar name={blog.author.name} size={7} />
              </div>
              <div>
                <div className="tetx-xl font-bold">{blog.author.name}</div>
                <div className="pt-2 text-slate-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  commodi quas deserunt aut, distinctio ipsa eos, repudiandae
                  laboriosam repellendus quae cumque dignissimos!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index";
import { formatDateWithSuffix } from "../utils/date";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
      <Appbar />
      <div>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>;
    </div>  
  }
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publisedDate={formatDateWithSuffix(blog.createdAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import { TBlog } from "@/types/blogs";

import BlogItem from "../blog-item";

type Props = {
  data: TBlog[];
};

const BlogList = ({ data }: Props) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((item) => {
        return <BlogItem key={item._id} item={item} />;
      })}
    </div>
  );
};

export default BlogList;

import { TBlog } from "@/types/blogs";

type Props = {
  item: TBlog;
};

const BlogItem = ({ item }: Props) => {
  console.log(item);
  return <div>BlogItem</div>;
};

export default BlogItem;

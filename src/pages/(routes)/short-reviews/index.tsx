import Title from "@/components/title";

import { TableReview } from "./components/table-review/table-review";

const ShortReviews = () => {
  return (
    <div>
      <Title className="mt-20" linePosition="center" text="Short Reviews" textPosition="center" />
      <TableReview />
    </div>
  );
};

export default ShortReviews;

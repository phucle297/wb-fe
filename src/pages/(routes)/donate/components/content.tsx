import { DotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Content = () => {
  return (
    <div className="container pb-5 pt-10">
      <p className="my-2">Xin chào các bạn,</p>
      <p>
        Weeboo Time xin gửi lời cảm ơn chân thành nhất tới các độc giả đã dành thời gian theo dõi chúng tôi. Weeboo Time
        là một dự án phi lợi nhuận với mong muốn chia sẻ và review những bộ Manga/Anime cho cộng đồng và qua đó cũng học
        hỏi thêm từ chính các bạn.
      </p>
      <p>
        Hiện tại dự án đang được thực hiện hoàn toàn bằng các nguồn lực cá nhân. Để sản xuất được nhiều nội dung chất
        lượng hơn, chúng tôi rất mong nhận được sự ủng hộ về ý tưởng, lời khuyên và đặc biệt là về tài chính 🙂
      </p>

      <p className="my-2">Các khoản đóng góp của các bạn sẽ được chúng tôi sử dụng để:</p>
      <ul>
        <li className="flex">
          <DotIcon />
          Chi trả chi phí hosting, tên miền, website
        </li>
        <li className="flex">
          <DotIcon />
          Chi trả bản quyền phần mềm, tài liệu,... phục vụ sản xuất nội dung
        </li>
      </ul>

      <p>
        Từ trước đến nay, các bạn trong nhóm sản xuất đều tham gia mà không nhận bất cứ thù lao hay chi phí nào cả. Nếu
        điều kiện cho phép, chúng tôi sẽ có thể hỗ trợ cho các bạn trong team để nội dung ngày càng nhiều và chất lượng
        hơn.
      </p>

      <p className="my-2">Cách thức ủng hộ:</p>

      <p>
        Đối với các bạn ở Việt Nam, các bạn có thể chuyển khoản cho tài khoản 0905xxxxxx tại Momo hoặc 0041000xxxxxx tại
        ngân hàng VietcomBank với nọi dung &quot;Ung ho Weeboo Time + ho ten + so dien thoai/email&quot;
      </p>

      <p>Đối với các bạn ở nước ngoài, các bạn có thể ủng hộ qua Ko-fi</p>
      <Button className="mt-2">Ủng hộ</Button>
    </div>
  );
};

export default Content;

import Banner from "@/components/banner";
import Title from "@/components/title";

const ContactUs = () => {
  return (
    <div>
      <Banner subtitle="Feedback? Questions? Let Us Know!" title="CONTACT US" />

      <div className="container h-72 py-10">
        <Title linePosition="center" text="GET IN TOUCH" textPosition="center" />
        <p className="mt-12 text-center">
          <span className="opacity-70">
            Nếu bạn có bất kỳ ý kiến phản hồi nào, vui lòng liên hệ chúng tôi qua email{" "}
          </span>
          <a
            className="border-b-2 border-transparent text-[hsl(var(--foreground))] transition-all duration-300 hover:border-foreground"
            href="mailto:ple.2971.dd@gmail.com"
          >
            tại đây
          </a>
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ContactUs;

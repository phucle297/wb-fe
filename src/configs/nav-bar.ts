import { TLink } from "@/types/links";

import { PATH } from "./path";

export const NavBarLinks: TLink[] = [
  { title: "Home", link: PATH.HOME },
  {
    title: "Types",
    link: PATH.SHORT_REVIEWS,
    children: [
      { title: "Anime", link: PATH.SHORT_REVIEWS + "?types=anime" },
      { title: "Manga", link: PATH.SHORT_REVIEWS + "?types=manga" },
      { title: "Web Novel/Light Novel", link: PATH.SHORT_REVIEWS + "?types=web_novel+light_novel" },
    ],
  },
  { title: "About us", link: PATH.ABOUT_US },
  { title: "Posts", link: PATH.POSTS },
  { title: "Donate", link: PATH.DONATE },
  { title: "Contacts us", link: PATH.CONTACT_US },
];

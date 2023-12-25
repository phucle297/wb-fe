import { TLink } from "@/types/links";

import { PATH } from "./path";

export const NavBarLinks: TLink[] = [
  { title: "Home", link: PATH.HOME },
  {
    title: "Types",
    link: PATH.SEARCH,
    children: [
      { title: "Anime", link: PATH.SEARCH + "?type=anime" },
      { title: "Manga", link: PATH.SEARCH + "?type=manga" },
      { title: "Web Novel/Light Novel", link: PATH.SEARCH + "?type=wn-ln" },
    ],
  },
  { title: "About us", link: PATH.ABOUT_US },
  { title: "Posts", link: PATH.POSTS },
  { title: "Donate", link: PATH.DONATE },
  { title: "Contacts us", link: PATH.CONTACT_US },
];

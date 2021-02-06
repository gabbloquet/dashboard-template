import About from "./views/About";
import Content from "./views/Content";
import Homepage from "./views/Homepage";
import {faCalendar, faHome, faUser} from "@fortawesome/free-solid-svg-icons";

export const configuration = [
  {
    name: 'Home',
    path: '/',
    logo: faHome,
    component: Homepage
  },
  {
    name: 'Content',
    path: '/content',
    logo: faCalendar,
    component: Content
  },
  {
    name: 'About',
    path: '/about',
    logo: faUser,
    component: About
  }
]

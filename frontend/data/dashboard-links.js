import { ACCOUNT_TYPE } from '../src/utils/constants';

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Add Projects",
    path: "/dashboard/add-projects",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscFolderOpened",
  },
  {
    id: 9,
    name: "Add Internships",
    path: "/dashboard/add-internships",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscBriefcase",
  },
  {
    id: 6,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 7,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
  {
    id: 8,
    name: "Add Category",
    path: "/dashboard/add-category",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscTag",
  },
];

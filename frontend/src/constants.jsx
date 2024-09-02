const employerIsLoggedIn = localStorage.getItem("employerToken") ? true : false;
import { Briefcase, FilePlus, House, User, Users } from "lucide-react";
import { CirclePlus } from "lucide-react";

export const navConstants = [
  { id: 1, name: "Find Jobs", route: "/find-jobs", shouldRender: true },
  {
    id: 2,
    name: "Find Companies",
    route: "/find-companies",
    shouldRender: true,
  },
  { id: 3, name: "Upload Jobs", route: "/employer/addjob", shouldRender: true },

  {
    id: 4,
    name: "Become an Employer",
    route: "/employer/signup",
    shouldRender: !employerIsLoggedIn,
  },
];

export const employerNav = [
  {
    id: 1,
    name: "All Jobs",
    route: "/employer/alljobs",
    shouldRender: true,
    icon: <Briefcase className="size-5" />, // Briefcase is more indicative of jobs and employment
  },
  {
    id: 2,
    name: "Profile",
    route: "/employer/profile",
    shouldRender: true,
    icon: <User className="size-5" />, // User icon for the profile section
  },
  {
    id: 3,
    name: "Upload Job",
    route: "/employer/addjob",
    shouldRender: true,
    icon: <FilePlus className="size-5" />, // FilePlus for adding or uploading new job postings
  },
  {
    id: 4,
    name: "Applications",
    route: "/employer/applications",
    shouldRender: true,
    icon: <Users className="size-5" />, // Users icon represents a group or multiple candidates
  },
];

export const jobTypes = [
  {
    id: "fulltime",
    label: "Full-time",
  },
  { id: "remote", label: "Remote" },
  { id: "internship", label: "Internship" },
];

export const expertise = ["Junior", "Intermediate", "Senior"];

export const jobs = [
  {
    id: 1,
    companyName: "Google",
    location: "Lagos, Nigeria",
    jobName: "Marketing Manager",
    experience: 3,
    jobType: "Remote",
    salary: 0,
    companyVerified: true,
    currency: "$",
    jobResponsibilities: [
      "Develop and implement comprehensive marketing strategies to support Google’s business objectives and  enhance brand visibility.",
      "Plan, execute, and optimize marketing campaigns across various channels, including digital, social media, and traditional media.",
      "Conduct market research and analyze consumer behavior to identify trends and opportunities for growth",
      "Work closely with product teams, creative departments, and external agencies to create compelling content and ensure alignment with overall marketing goals",
      "Monitor and analyze campaign performance, providing actionable insights and recommendations for continuous improvement.",
    ],
    weOffer: [
      "Work in a cutting-edge, collaborative environment that encourages creativity and innovation.",
      "Attractive compensation package with performance-based incentives.",
      "Health, dental, and vision insurance, along with wellness programs and retirement plans",
      "Opportunities for career development and continuous learning through training programs and mentorship",
    ],
    jobRequirements: [],
    qualifications: [],
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    urgentHiring: true,
    aboutCompany:
      "At Google, we believe in making information universally accessible and useful. As a global leader in technology and innovation, we strive to empower our users with cutting-edge solutions and tools that transform the way they interact with the world. Join us in shaping the future of technology and redefining the way people live and work.",
    jobDescription:
      "We are seeking a highly skilled and strategic Marketing Manager to join our dynamic team. In this role, you will be responsible for developing and executing innovative marketing strategies to enhance Google’s brand presence and drive user engagement. You will work closely with cross-functional teams to deliver impactful campaigns and contribute to our mission of delivering world-class products and services.",
    otherInfo: ["Remote", "Full Time", "Freelance"],
    applicationEmail: "johnossai20@spli.com",
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRB4kg1jgnqD5fEaCSHKMoUdFeTBj9CH_opA&s",
  },
  {
    id: 2,
    companyName: "Google",
    location: "Lagos, Nigeria",
    jobName: "Marketing Manager",
    jobDescription:
      "Our company is looking for an experienced Marketing Manager to lead our marketing efforts and drive the growth of our brand...",
    otherInfo: ["Remote", "Full Time", "Freelance"],
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRB4kg1jgnqD5fEaCSHKMoUdFeTBj9CH_opA&s",
  },
  {
    id: 3,
    companyName: "Google",
    location: "Lagos, Nigeria",
    jobName: "Marketing Manager",
    experience: 3,
    jobType: "Remote",
    salary: 0,
    currency: "$",
    jobResponsibilities: [
      "Develop and implement comprehensive marketing strategies to support Google’s business objectives and  enhance brand visibility.",
      "Plan, execute, and optimize marketing campaigns across various channels, including digital, social media, and traditional media.",
      "Conduct market research and analyze consumer behavior to identify trends and opportunities for growth",
      "Work closely with product teams, creative departments, and external agencies to create compelling content and ensure alignment with overall marketing goals",
      "Monitor and analyze campaign performance, providing actionable insights and recommendations for continuous improvement.",
    ],
    weOffer: [
      "Work in a cutting-edge, collaborative environment that encourages creativity and innovation.",
      "Attractive compensation package with performance-based incentives.",
      "Health, dental, and vision insurance, along with wellness programs and retirement plans",
      "Opportunities for career development and continuous learning through training programs and mentorship",
    ],
    urgentHiring: true,
    aboutCompany:
      "At Google, we believe in making information universally accessible and useful. As a global leader in technology and innovation, we strive to empower our users with cutting-edge solutions and tools that transform the way they interact with the world. Join us in shaping the future of technology and redefining the way people live and work.",
    jobDescription:
      "We are seeking a highly skilled and strategic Marketing Manager to join our dynamic team. In this role, you will be responsible for developing and executing innovative marketing strategies to enhance Google’s brand presence and drive user engagement. You will work closely with cross-functional teams to deliver impactful campaigns and contribute to our mission of delivering world-class products and services.",
    otherInfo: ["Remote", "Full Time", "Freelance"],
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRB4kg1jgnqD5fEaCSHKMoUdFeTBj9CH_opA&s",
  },
  {
    id: 4,
    companyName: "Google",
    location: "Lagos, Nigeria",
    jobName: "Marketing Manager",
    jobDescription:
      "Our company is looking for an experienced Marketing Manager to lead our marketing efforts and drive the growth of our brand...",
    otherInfo: ["Remote", "Full Time", "Freelance"],
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRB4kg1jgnqD5fEaCSHKMoUdFeTBj9CH_opA&s",
  },
];

export const cv = [
  {
    _id: {
      $oid: "66cb46a2c707440f8de6e4ba",
    },
    user: {
      $oid: "66cb46a2c707440f8de6e4b9",
    },
    profileSummary: "",
    skills: ["Designing", "Time Management", "LeaderShip"],
    languages: [],
    resumeFilePath: "",
    jobExperience: [
      {
        title: "Graphics Designer",
        company: "SplinTech",
        location: "Abuja",
        startDate: {
          $date: "2024-08-30T23:00:00.000Z",
        },
        endDate: {
          $date: "2024-08-01T23:00:00.000Z",
        },
        responsibilities: "",
        _id: {
          $oid: "66ceb95697d2d5833ade4494",
        },
      },
      {
        title: "Marketing Manager",
        company: "Vix Hr",
        location: "Lagos",
        startDate: {
          $date: "2024-04-02T23:00:00.000Z",
        },
        endDate: {
          $date: "2024-11-01T23:00:00.000Z",
        },
        responsibilities: "",
        _id: {
          $oid: "66ceb95697d2d5833ade4495",
        },
      },
    ],
    __v: 0,
    firstName: "John",
    homeAddress: "Nyanya, Abuja",
    lastName: "Ossai",
    phoneNo: "08140037556",
    portfolio: "https://johnos.vercel.app/",
    yearsOfExp: "1",
    socials: {
      linkedin: "https://johnos.vercel.app/",
      facebook: "https://johnos.vercel.app/",
      twitter: "https://johnos.vercel.app/",
      _id: {
        $oid: "66cebdf6ebff3276f58c3ad7",
      },
    },
  },
];

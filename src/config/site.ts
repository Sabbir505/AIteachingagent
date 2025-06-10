export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EduGenius",
  description:
    "An AI-Powered Multimodal Learning Platform for teachers and students.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/firebase/firebase-studio", // Replace with actual project link
  },
  roles: {
    student: "Student",
    teacher: "Teacher",
    parent: "Parent",
  } as const,
};

export type UserRole = keyof typeof siteConfig.roles;

import { DocsConfig } from "@/types"
// TODO: How about also create an optional dropdown for each of the mainNav items?
export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Admissions",
      items: [
        {
          title: "Students",
          href: "/admin/students",
        },
        {
          title: "Teachers",
          href: "/admin/teachers",
        },
        {
          title: "Classes",
          href: "/admin/classes",
        },
        {
          title: "Subjects",
          href: "/admin/subjects",
        },
      ],
    },
    {
      title: "Academic Records",
      items: [
        {
          title: "Students",
          href: "/admin/students",
        },
        {
          title: "Transcripts",
          href: "/admin/teachers",
        },
        {
          title: "Grades",
          href: "/admin/classes",
        },
        {
          title: "Academic History",
          href: "/admin/subjects",
        },
      ],
    },
    {
      title: "Class Management",
      items: [
        // NOTE: Classes will already include all the students and teachers, subjects, assigned schedules, etc.
        {
          title: "Classes",
          href: "/admin/users",
        },
        {
          title: "Assigned Teachers",
          href: "/admin/sessions",
        },
        {
          title: "",
          href: "/admin/sessions",
        },
      ],
    },
    {
      title: "Payment",
      items: [
        {
          title: "Payment Fees",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Payment Fee Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Invoice",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tracking",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Financial Reporting",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Logs",
      items: [
        {
          title: "API Logs",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Performance Logs",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Events",
      items: [
        {
          title: "",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}
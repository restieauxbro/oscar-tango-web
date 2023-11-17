import React from "react";

const CaseStudiesPage: React.FC = () => {
  const dummyLinks = [
    { title: "Case Study 1", url: "/case-study-1" },
    { title: "Case Study 2", url: "/case-study-2" },
    { title: "Case Study 3", url: "/case-study-3" },
    { title: "Case Study 4", url: "/case-study-4" },
    { title: "Case Study 5", url: "/case-study-5" },
  ];

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="grid gap-8">
        <h1>Case Studies</h1>
        <ul>
          {dummyLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CaseStudiesPage;

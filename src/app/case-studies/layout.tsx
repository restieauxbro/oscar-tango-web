import AuthWall from "@/components/auth/auth-wall";
import React from "react";

const CaseStudiesLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthWall client="oscar-tango">{children}</AuthWall>;
};

export default CaseStudiesLayout;

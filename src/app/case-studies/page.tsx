import React from "react";
import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const CaseStudiesPage = async () => {
  const OTDatabase = await notion.databases.query({
    database_id: "349dce2f4de34907add3f5a750c78cb1",
  });

  const pages = OTDatabase.results.map((page) => {
    return {
      id: page.id,
      //@ts-ignore
      properties: page.properties as CaseStudyProperties,
    };
  });

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="grid gap-8">
        <h1>Case Studies</h1>
        {}
        <ul>
          {pages.map(({ id, properties }) => (
            <li key={id}>
              {JSON.stringify(properties, null, 2)}
              <a href={`/case-studies/${id}`}>{id}</a>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <br />
        <pre>{JSON.stringify(OTDatabase, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CaseStudiesPage;

type CaseStudyProperties = {
  Tags: {
    id: "SjWT";
    type: "multi_select";
    multi_select: [
      {
        id: "6f7cd2d0-0955-413f-b671-db66b0ab1fb2";
        name: "AI for starters";
        color: "yellow";
      },
    ];
  };
  slug: {
    id: "%5Emh%7C";
    type: "rich_text";
    rich_text: [
      {
        type: "text";
        text: { content: "ai-safety"; link: null };
        annotations: {
          bold: false;
          italic: false;
          strikethrough: false;
          underline: false;
          code: false;
          color: "default";
        };
        plain_text: "ai-safety";
        href: null;
      },
    ];
  };
  Name: {
    id: "title";
    type: "title";
    title: [
      {
        type: "text";
        text: { content: "An article on AI safety"; link: null };
        annotations: {
          bold: false;
          italic: false;
          strikethrough: false;
          underline: false;
          code: false;
          color: "default";
        };
        plain_text: "An article on AI safety";
        href: null;
      },
    ];
  };
};

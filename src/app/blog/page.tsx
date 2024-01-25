import React, { Suspense } from "react";
import { Client } from "@notionhq/client";
import { headingStyles } from "@/components/ui/typography";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BlogListPage = async () => {
  const OTDatabase = await notion.databases.query({
    database_id: "349dce2f4de34907add3f5a750c78cb1",
    // filter_properties: ["title", "SjWT"],
  });

  const pages = OTDatabase.results.map((page) => {
    return {
      id: page.id,
      //@ts-ignore
      properties: page.properties as BlogArticle,
    };
  });

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="grid gap-8">
        <h1 className={headingStyles}>Blog</h1>
        <ul className="grid gap-8">
          {pages.map(({ id, properties }) => {
            const slug = properties.slug?.rich_text[0]?.text.content;
            if (!slug) return null;
            return (
              <li key={id}>
                <a href={`/blog/${slug}`}>{properties.Name.title[0].plain_text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogListPage;

export type BlogArticle = {
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
  slug?: {
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
  "AI summary": {
    id: "Iz%7B%3F";
    type: "rich_text";
    rich_text: [
      {
        type: "text";
        text: {
          content: string;
          link: null;
        };
        annotations: {
          bold: false;
          italic: false;
          strikethrough: false;
          underline: false;
          code: false;
          color: "default";
        };
        plain_text: string;
        href: null;
      },
    ];
  };
  "Created by": {
    id: "%40aQp";
    type: "created_by";
    created_by: {
      object: "user";
      id: string;
      name: string;
      avatar_url: null;
      type: "person";
      person: {};
    };
  };
};

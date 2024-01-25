import React from "react";
import { Client, isFullPageOrDatabase } from "@notionhq/client";
import { BlogArticle } from "../page";
import { convertToHtml } from "@/lib/notion";
import { headingStyles } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BlogPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) => {
  const fullOrPartialPages = await notion.databases.query({
    database_id: "349dce2f4de34907add3f5a750c78cb1",
    filter: {
      property: "slug",
      rich_text: {
        equals: params.slug,
      },
    },
    // filter_properties: ["title", "SjWT"],
  });
  for (const page of fullOrPartialPages.results) {
    if (!isFullPageOrDatabase(page)) {
      console.log("Not a full page or database");
      continue;
    }
    // The page variable has been narrowed from
    //      PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse
    // to
    //      PageObjectResponse | DatabaseObjectResponse.
    console.log("Created at:", page.created_time);
    const {
      "AI summary": aiSummary,
      "Created by": createdBy,
      Name,
    } = page.properties as BlogArticle;

    const pageChildren = await notion.blocks.children.list({
      block_id: page.id,
      page_size: 50,
    });

    const childrenHtml = convertToHtml(pageChildren);

    return (
      <div className="prose prose-neutral mx-auto px-8 py-36">
        <h1 className={cn(headingStyles, "text-balance mb-8 text-neutral-800")}>
          {Name.title[0].plain_text}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: childrenHtml }}
          className=""
        ></div>
      </div>
    );
  }
};

export default BlogPage;

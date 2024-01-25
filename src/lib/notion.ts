import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

type RichText = {
  type: string;
  text: {
    content: string;
    link: null | { url: string };
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
};

type Block = {
  object: string;
  id: string;
  type: string;
  [key: string]: any;
};

export function convertToHtml(
  paginatedChildren: ListBlockChildrenResponse,
): string {
  const blocks = paginatedChildren.results;
  let html = "";

  blocks?.forEach(
    // @ts-ignore
    (block: Block) => {
      switch (block.type) {
        case "heading_1":
          html += `<h1>${renderRichText(block.heading_1.rich_text)}</h1>`;
          break;
        case "heading_2":
          html += `<h2>${renderRichText(block.heading_2.rich_text)}</h2>`;
          break;
        case "paragraph":
          html += `<p>${renderRichText(block.paragraph.rich_text)}</p>`;
          break;
        case "numbered_list_item":
          html += `<li>${renderRichText(
            block.numbered_list_item.rich_text,
          )}</li>`;
          break;
        // ... handle other block types as needed
      }
    },
  );

  return html;
}

function renderRichText(richTexts: RichText[]): string {
  return richTexts
    .map((richText) => {
      if (richText.annotations.bold) {
        return `<strong>${richText.plain_text}</strong>`;
      } else if (richText.annotations.italic) {
        return `<em>${richText.plain_text}</em>`;
      } else if (richText.annotations.strikethrough) {
        return `<s>${richText.plain_text}</s>`;
      } else if (richText.annotations.underline) {
        return `<u>${richText.plain_text}</u>`;
      } else if (richText.annotations.code) {
        return `<code>${richText.plain_text}</code>`;
      } else {
        return richText.plain_text;
      }
    })
    .join("");
}

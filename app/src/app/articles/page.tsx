import type { Metadata } from "next";
import { Container } from "@chakra-ui/react";
import { ArticlesList } from "@/components/page-components/articles-list";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getArticlesPageData } from "@/data/articles/articles-page";
import { buildPageTitle, createDescription, createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const articlesPageData = await getArticlesPageData();

  return createMetadata({
    title: buildPageTitle("Articles"),
    description: createDescription(
      articlesPageData.intro.mainTitle,
      articlesPageData.intro.text1,
      articlesPageData.intro.text2,
    ),
    path: "/articles",
  });
}

export default async function ArticlesPage() {
  const articlesPageData = await getArticlesPageData();

  return (
    <Container>
      <TextContentBlock {...articlesPageData.intro} />
      <ArticlesList items={articlesPageData.items} />
    </Container>
  );
}

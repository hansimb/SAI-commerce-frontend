import { Container } from "@chakra-ui/react";
import { ArticlesList } from "@/components/page-components/articles-list";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getArticlesPageData } from "@/data/loaders/articles";

export default function ArticlesPage() {
  const articlesPageData = getArticlesPageData();

  return (
    <Container>
      <TextContentBlock {...articlesPageData.intro} />
      <ArticlesList items={articlesPageData.items} />
    </Container>
  );
}

import { Container } from "@chakra-ui/react";
import { ArticlesList } from "@/components/page-components/articles-list";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { articlesListMockData } from "@/data/mock-data";

const articlesIntro = {
  thoughtTitle: "Technical Writing",
  mainTitle: "Articles from the workshop",
  text1:
    "A lightweight first pass for the future articles area. The content is still mock-driven, but the structure is ready for later API-backed editorial content.",
};

export default function ArticlesPage() {
  return (
    <Container>
      <TextContentBlock {...articlesIntro} />
      <ArticlesList items={articlesListMockData} />
    </Container>
  );
}

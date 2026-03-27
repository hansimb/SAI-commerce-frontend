import { Box, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { getArticleDetailPageData } from "@/data/articles/article-detail-page";

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleDetailPageData(slug);

  if (!article) {
    notFound();
  }

  return (
    <Container maxW="container.lg" py={12}>
      <Stack gap={8} maxW="3xl" mx="auto">
        <Box>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="accentBright"
            textTransform="uppercase"
            mb={3}
          >
            {article.category}
          </Text>
          <Heading as="h1" size="4xl" mb={4}>
            {article.title}
          </Heading>
          {(article.author || article.publishedAt) && (
            <Text color="fgMuted">
              {[article.author, article.publishedAt].filter(Boolean).join(" - ")}
            </Text>
          )}
        </Box>

        {article.image && (
          <Image
            src={article.image.src}
            alt={article.image.alt || article.title}
            rounded="lg"
            objectFit="cover"
          />
        )}

        {article.excerpt && (
          <Text fontSize="xl" lineHeight="tall" color="fgMuted">
            {article.excerpt}
          </Text>
        )}

        <Box
          lineHeight="tall"
          css={{
            "& p": {
              marginBottom: "1.25rem",
            },
            "& h2, & h3": {
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            "& ul, & ol": {
              paddingLeft: "1.25rem",
              marginBottom: "1.25rem",
            },
            "& li": {
              marginBottom: "0.5rem",
            },
          }}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </Stack>
    </Container>
  );
}

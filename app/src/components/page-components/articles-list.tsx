import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { ArticleListItem } from "@/data/mock-data";

interface ArticlesListProps {
  items: ArticleListItem[];
}

export function ArticlesList({ items }: ArticlesListProps) {
  return (
    <Stack gap={8} py={10}>
      {items.map((item) => (
        <Box key={item.slug} borderWidth="1px" rounded="lg" p={8}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="accentBright"
            textTransform="uppercase"
            mb={3}
          >
            {item.category}
          </Text>
          <Heading as="h2" size="xl" mb={3}>
            {item.title}
          </Heading>
          {(item.author || item.publishedAt) && (
            <Text fontSize="sm" color="fgMuted" mb={4}>
              {[item.author, item.publishedAt].filter(Boolean).join(" - ")}
            </Text>
          )}
          <Text>{item.excerpt}</Text>
        </Box>
      ))}
    </Stack>
  );
}

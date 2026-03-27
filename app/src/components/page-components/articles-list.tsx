import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { ArticleListItem } from "@/types/articles";

interface ArticlesListProps {
  items: ArticleListItem[];
}

export function ArticlesList({ items }: ArticlesListProps) {
  return (
    <Stack gap={8} py={10} align="center">
      {items.map((item) => (
        <Link key={item.slug} href={`/articles/${item.slug}`} style={{ width: "100%", maxWidth: "56rem" }}>
          <Box
            borderWidth="1px"
            rounded="lg"
            p={8}
            w="full"
            transition="border-color 0.2s ease, transform 0.2s ease"
            _hover={{
              borderColor: "accentBright",
              transform: "translateY(-2px)",
            }}
          >
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
            {item.excerpt && <Text>{item.excerpt}</Text>}
          </Box>
        </Link>
      ))}
    </Stack>
  );
}

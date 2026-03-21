"use client";

import { Box, SimpleGrid, Stack, Heading, Text, Icon } from "@chakra-ui/react";
import { FiTool, FiAward, FiUsers, FiHeart } from "react-icons/fi";

const iconMap = {
  tool: FiTool,
  award: FiAward,
  users: FiUsers,
  heart: FiHeart,
} as const;

export type ContentBoxIcon = keyof typeof iconMap;

export interface ContentBoxItem {
  icon: ContentBoxIcon;
  title: string;
  description: string;
}

interface ContentBoxesProps {
  items: ContentBoxItem[];
}

export const ContentBoxes = ({ items }: ContentBoxesProps) => {
  return (
    <Box as="section" py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
        {items.map((item) => {
          const IconComponent = iconMap[item.icon];

          return (
            <Box key={item.title} borderWidth="1px" rounded="md" p={8}>
              <Stack padding={4}>
                <Icon as={IconComponent} boxSize={8} />
                <Heading as="h3" size="lg">
                  {item.title}
                </Heading>
                <Text>{item.description}</Text>
              </Stack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

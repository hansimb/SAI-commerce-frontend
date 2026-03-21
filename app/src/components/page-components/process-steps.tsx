"use client";
import { Box, SimpleGrid, Stack, Heading, Text, Icon } from "@chakra-ui/react";
import { FiZap, FiTool, FiShield } from "react-icons/fi";

export interface ProcessStepItem {
  number: string;
  icon: "zap" | "tool" | "shield";
  title: string;
  description: string;
}

const iconMap = {
  zap: FiZap,
  tool: FiTool,
  shield: FiShield,
} as const;

interface ProcessStepsProps {
  steps: ProcessStepItem[];
}

export const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <Box as="section" pb={12}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        {steps.map((step) => {
          const IconComponent = iconMap[step.icon];

          return (
            <Box key={step.number} borderWidth="1px" rounded="md" p={6}>
              <Stack padding={2}>
                <Text fontSize="3xl" fontWeight="bold">
                  {step.number}
                </Text>
                <Icon as={IconComponent} boxSize={8} />
                <Heading as="h3" size="lg">
                  {step.title}
                </Heading>
                <Text>{step.description}</Text>
              </Stack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

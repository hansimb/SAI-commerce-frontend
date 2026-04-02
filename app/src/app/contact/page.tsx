import type { Metadata } from "next";
import { Container, Stack } from "@chakra-ui/react";
import { ContactMethodsCard } from "@/components/page-components/contact/contact-methods-card";
import { getContactPageData } from "@/data/loaders/contact-page";
import { buildPageTitle, createDescription, createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const contactPageData = await getContactPageData();

  return createMetadata({
    title: buildPageTitle("Contact"),
    description: createDescription(contactPageData.title, contactPageData.intro),
    path: "/contact",
  });
}

export default async function ContactRoutePage() {
  const contactPageData = await getContactPageData();

  return (
    <Container>
      <Stack gap={8} py={10}>
        <ContactMethodsCard
          eyebrow={contactPageData.eyebrow}
          title={contactPageData.title}
          intro={contactPageData.intro}
          items={contactPageData.contactMethods}
        />
      </Stack>
    </Container>
  );
}

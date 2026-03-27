import { Container, Stack } from "@chakra-ui/react";
import { ContactMethodsCard } from "@/components/page-components/contact/contact-methods-card";
import { getContactPageData } from "@/data/loaders/contact";

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

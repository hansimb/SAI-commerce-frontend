import { Container, Stack } from "@chakra-ui/react";
import { ContactInquiryCard } from "@/components/page-components/contact/contact-inquiry-card";
import { ContactIntroCard } from "@/components/page-components/contact/contact-intro-card";
import { ContactMethodsCard } from "@/components/page-components/contact/contact-methods-card";
import { getContactPageData } from "@/data/loaders/contact";

export default function ContactRoutePage() {
  const contactPageData = getContactPageData();

  return (
    <Container>
      <Stack gap={8} py={10}>
        <ContactIntroCard
          eyebrow={contactPageData.eyebrow}
          title={contactPageData.title}
          intro={contactPageData.intro}
        />

        <Stack direction={{ base: "column", md: "row" }} gap={6}>
          <ContactMethodsCard items={contactPageData.contactMethods} />
          <ContactInquiryCard
            studioTitle={contactPageData.studioTitle}
            studioText={contactPageData.studioText}
            inquiryTitle={contactPageData.inquiryTitle}
            inquiryText={contactPageData.inquiryText}
            ctaLabel={contactPageData.ctaLabel}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

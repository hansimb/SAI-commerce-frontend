import { Container } from "@chakra-ui/react";
import { ContactPage } from "@/components/page-components/contact-page";
import { getContactPageData } from "@/data/pages/contact";

export default function ContactRoutePage() {
  const contactPageData = getContactPageData();

  return (
    <Container>
      <ContactPage data={contactPageData} />
    </Container>
  );
}

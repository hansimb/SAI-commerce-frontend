import { Container } from "@chakra-ui/react";
import { ContactPage } from "@/components/page-components/contact-page";
import { contactPageMockData } from "@/data/mock-data";

export default function ContactRoutePage() {
  return (
    <Container>
      <ContactPage data={contactPageMockData} />
    </Container>
  );
}

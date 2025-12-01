import { Container, HeadTitle, TopBar } from "../components/shared/index";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <HeadTitle text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
    </>
  );
}

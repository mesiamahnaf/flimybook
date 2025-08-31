import { Container } from "@/components/ui";

//Components
import Book from "@/components/home/Book";
import Movies from "@/components/home/Movies";
import TrendingMovies from "@/components/home/TrendingMovies";
import TrendingTvs from "@/components/home/TrendingTvs";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";

const Page = () => {
  //Trpc
  void trpc.users.count.prefetch();

  return (
    <Container className="pt-[100px]">
      <HydrateClient>
        <div className="grid grid-cols-2 sm:grid-cols-2 xxs:grid-cols-1 gap-5">
          <Movies />
          <Book />
        </div>
      </HydrateClient>
      <TrendingMovies />
      <TrendingTvs />
    </Container>
  );
};

export default Page;
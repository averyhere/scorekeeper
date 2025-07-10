import { PointTracker } from "@/components/PointTracker";
import { Main } from "@/components/main";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen p-2 flex flex-col gap-4 items-center justify-start">
        <Main className="w-full grow">
          <PointTracker />
        </Main>
      </div>
    </>
  );
}

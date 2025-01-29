import { useMemo, useState } from "react";
import { PlaysTable } from "@/components/PlayersTable";
import SeasonSelector from "@/components/SeasonSelector";
import ReactPaginate from 'react-paginate';
import { useSeasons } from "@/hooks/useSeasons";
import { usePlayerStats } from "@/hooks/usePlayerStats";
import { usePages } from '@/hooks/usePages';

const LINK_CLASS = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9";
const PREV_CLASS = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5";

const take = 10;

function Home() {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(0); // O means all season

  const {data: pageCount, isLoading: isPageCountLoading} = usePages(take, year);

  const { data: optionData, isLoading: isOptionLoading } = useSeasons();
  const options = useMemo(() => {
    if (isOptionLoading) return [];
    return optionData ? optionData.map((item) => ({ label: item.toString(), value: item.toString() })) : [];
  }, [optionData, isOptionLoading]);

  const { data: playersData, isLoading: isPlayersLoading } = usePlayerStats(page, take, year);

  function handlePageClick(selectedItem: { selected: number; }): void {
    setPage(selectedItem.selected + 1);
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 h-screen flex flex-col">

      <div className="bg-[#f0f0f0] text-black font-bold py-4 mt-4">
        <h1 className="text-center text-2xl font-bold">Player Stats</h1>
      </div>


      <main className="mt-6 flex-grow flex flex-col mb-4">
        <SeasonSelector options={options} setSeason={setYear} />


        <div className="flex-grow mt-6 bg-white p-4 shadow rounded-md overflow-x-auto">
          <PlaysTable playersData={playersData} isFetching={isPlayersLoading} offset={(page - 1) * take} />
        </div>

        <div className="mt-4 flex justify-end items-center">
          <ReactPaginate
            className="flex gap-4 p-2"
            previousLinkClassName={PREV_CLASS}
            nextLinkClassName={PREV_CLASS}
            pageLinkClassName={LINK_CLASS}
            activeClassName="border"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount || 0}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface PaginationProps {
  data: object;
  setDataToDisplay: (val: Array<Array<string>>) => void;
  valPerPage: number;
}
const Pagination = ({
  data,
  setDataToDisplay,
  valPerPage,
}: PaginationProps) => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const DataArray = Object.entries(data);
  const totalPages = DataArray.length / valPerPage;
  console.log(totalPages);

  useEffect(() => {
    const start = (currentPageNumber - 1) * valPerPage;
    const end = currentPageNumber * valPerPage;
    const reverserArray = DataArray.reverse();
    setDataToDisplay(reverserArray.slice(start, end));
  }, [currentPageNumber]);

  const handlePrev = () => {
    if (currentPageNumber !== 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };
  const handleNext = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };
  return (
    <div className="border border-gray-200 mt-2 w-15 flex rounded-[2px] items-center justify-center gap-2">
      <ChevronLeft
        onClick={handlePrev}
        className={`${
          currentPageNumber === 1 ? "cursor-none" : "cursor-pointer "
        } text-blue-950`}
        width={15}
      />
      <p className="text-[10px]">{currentPageNumber}</p>
      <ChevronRight
        onClick={handleNext}
        className={`${
          currentPageNumber === totalPages ? "cursor-none" : "cursor-pointer "
        } text-blue-950`}
        width={15}
      />
    </div>
  );
};

export default Pagination;

import { useMemo } from 'react';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalDataCount,
  pageSize,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalDataCount / pageSize);

    let itemRange = range(1, 3);

      return [...itemRange, totalPageCount];
  }, [totalDataCount, pageSize]);

  return paginationRange;
};
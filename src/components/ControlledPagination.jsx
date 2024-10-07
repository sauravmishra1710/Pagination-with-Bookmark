import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../pagination-hooks/useControlledPagination';
import ItemsPerPage from './ItemsPerPage';
import './pagination.scss';

const ControlledPagination = props => {
  const {
    onPageChange,
    onUpdateItemsPerPage,
    totalDataCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalDataCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onLastPage = () => {
    onPageChange(lastPage);
  };

  const onFirstPage = () => {
    onPageChange(1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container paginationbarControlled'
    >
        <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onFirstPage}
      >
        <div className="arrow firstpage" />
        <div className="arrow firstpage" />
      </li>

      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onLastPage}
      >
        <div className="arrow lastpage" />
        <div className="arrow lastpage" />
      </li>
      <li>
        <ItemsPerPage onChangeCallback={onUpdateItemsPerPage}></ItemsPerPage>
      </li>
    </ul>
  );
};

export default ControlledPagination;
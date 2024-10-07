import React from 'react';
import classnames from 'classnames';
import { usePagination } from '../pagination-hooks/useProgressivePagination';
import ItemsPerPage from './ItemsPerPage';
import './pagination.scss';

const ProgressivePagination = props => {
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
    <div className='masterContainer'>
        <div className="masterContainer-summary">Page {currentPage} of {lastPage}</div>
        <div className="masterContainer-pagination">
            <ul
            className='pagination-container paginationbarProgressive'
            >
                <li
                className={classnames('pagination-item', {
                disabled: currentPage === 1
                })}
                onClick={onFirstPage}
                >
                    <span style={{marginRight: "5px", marginTop: "3px"}}>First</span>
                </li>

                <li
                    className={classnames('pagination-item', {
                    disabled: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
                    <div className="arrow left"/>
                    <span style={{marginLeft: "5px", marginTop: "3px"}}>Previous</span>
                </li>

                <li
                    className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
                    <span style={{marginRight: "5px", marginTop: "3px"}}>Next</span>
                    <div className="arrow right" />
                </li>

                <li
                    className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                    })}
                    onClick={onLastPage}
                >
                    <span style={{marginRight: "5px", marginTop: "3px"}}>Last</span>
                </li>

                <li>
                    <ItemsPerPage onChangeCallback={onUpdateItemsPerPage}></ItemsPerPage>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default ProgressivePagination;
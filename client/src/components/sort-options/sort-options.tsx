import type { JSX } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType } from '../../store/action';
import { SortType as SortTypeConst } from '../../const';

const SORT_OPTIONS: { type: typeof SortTypeConst[keyof typeof SortTypeConst]; label: string }[] = [
  { type: SortTypeConst.Popular, label: 'Popular' },
  { type: SortTypeConst.PriceLowToHigh, label: 'Price: low to high' },
  { type: SortTypeConst.PriceHighToLow, label: 'Price: high to low' },
  { type: SortTypeConst.TopRated, label: 'Top rated first' },
];

function SortOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = SORT_OPTIONS.find(option => option.type === currentSort)?.label || 'Popular';

  const handleSortClick = (sortType: typeof SortTypeConst[keyof typeof SortTypeConst]) => {
    dispatch(setSortType(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span 
        className="places__sorting-type" 
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
            e.preventDefault();
          }
        }}
      >
        {currentLabel}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li 
            key={option.type}
            className={`places__option ${currentSort === option.type ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(option.type)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSortClick(option.type);
                e.preventDefault();
              }
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
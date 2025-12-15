import type { JSX } from 'react';
import Review from '../review/review';
import type { Review as ReviewType } from '../../types/review';

interface Props {
  reviews: ReviewType[];
}

function ReviewsList({ reviews }: Props): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
import React, { useMemo, useState } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StarRate({ count, rating, color, onRating }) {
    const [hoverRating, setHoverRating] = useState(0);

    const starRating = useMemo(() => {
        const getColor = (index) => {
            if (hoverRating >= index) {
                return color.filled;
            } else if (!hoverRating && rating >= index) {
                return color.filled;
            }

            return color.unfilled;
        };
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FontAwesomeIcon
                    key={idx}
                    className="cursor-pointer"
                    icon="star"
                    onClick={() => onRating(idx)}
                    style={{ color: getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ));
    }, [count, rating, color, onRating, hoverRating]);

    return <div>{starRating}</div>;
};

StarRate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    },
};

StarRate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "orange",
        unfilled: "#C0C0C0",
    },
};
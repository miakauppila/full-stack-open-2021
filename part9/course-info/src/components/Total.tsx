import React from 'react';

interface PartsProps {
    parts: Array<{ name: string, exerciseCount: number }>;
}

const Total = (props: PartsProps) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
};

export default Total;
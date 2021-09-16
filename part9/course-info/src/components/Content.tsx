import React from 'react';
import CoursePart from '../types';
import Part from './Part';

interface PartsProps {
    parts: Array<CoursePart>;
}

const Content = ({ parts }: PartsProps) => {
    return (
        <div>
           {parts.map((part) => 
                <Part key={part.name} part={part} />
           )}
        </div>
    )
};

export default Content;
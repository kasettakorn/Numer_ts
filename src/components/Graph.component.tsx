import React from 'react'
import { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';

interface GraphProp {
    fx: math.MathExpression,
    title: string
}

export default function Graph({ fx, title } : GraphProp) {
    return (
        <Plot
            data={[
                {
                    x: range(-10, 10, 0.5).toArray(),
                    y: range(-10, 10, 0.5).toArray().map(function (x) {
                        return compile(fx).evaluate({ x: x })
                    }),
                    type: 'scatter',
                    marker: { color: 'green' },
                },
            ]}
            layout={{ title: title }}
        />
    )
};
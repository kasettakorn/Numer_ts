import React from 'react'
import math, { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';

interface GraphProp {
    fx: math.MathExpression,
    title: string
}

export default function Graph(props : GraphProp) {
    let { fx, title } = props;

    return (
        <Plot
            data={[
                {
                    x: range(-10, 10, 0.5).toArray(),
                    y: range(-10, 10, 0.5).toArray().map(function (x) {
                        return compile(fx).evaluate({ x: x })
                    }),
                    type: 'scatter',
                    marker: { color: 'red' },
                },
            ]}
            layout={{ title: title }}
        />
    )
}

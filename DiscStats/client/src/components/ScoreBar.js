import React, { useEffect, useRef } from "react";
import Chartjs from "chart.js";

const chartConfig = (names, breakdown) => {
    const labels = [...names];
    const data = [breakdown.minus, breakdown.birdie, breakdown.par, breakdown.bogey, breakdown.double, breakdown.plus];
    const backgroundColor = [
        "rgba(51, 153, 243, 0.6)", "rgba(60, 181, 33, 0.6)",
        "rgba(68, 110, 155, 0.6)", "rgba(205, 2, 0, 0.6)",
        "rgba(212, 117, 0, 0.6)", "rgba(153, 153, 153, 0.6)"
    ]
    const borderColor = [
        "rgba(51, 153, 243, 1)", "rgba(60, 181, 33, 1)",
        "rgba(68, 110, 155, 1)", "rgba(205, 2, 0, 1)",
        "rgba(212, 117, 0, 1)", "rgba(153, 153, 153, 1)",
    ]

    return ({
        type: "horizontalBar",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "All Time Score Breakdown",
                fontSize: 16
            },
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    })
};

export const ScoreBar = ({ scoreBreakdown }) => {
    const chartContainer = useRef(null);
    const names = ["Eagle -", "Birdie", "Par", "Bogey", "Dbl Bogey", "3+ Bogey"];

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            new Chartjs(chartContainer.current, chartConfig(names, scoreBreakdown));
        }
    }, [chartContainer]);

    return (
        <canvas ref={chartContainer} />
    );
};
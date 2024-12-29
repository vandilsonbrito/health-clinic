import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
    datasets: [
        {
            label: 'Número de consultas mensal em 2024',
            data: [5, 15, 22, 43, 55, 60, 29, 40, 30, 42, 60, 70],
            borderColor: 'rgba(75, 192, 192, 1)', 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
        }
    ],
};

const OverviewChart = () => {
    return (
        <div className="w-[38rem] h-[20rem] p-5 rounded-md border-2 border-slate-200">
            <Line data={data} />
        </div>
    );
};

export default OverviewChart;
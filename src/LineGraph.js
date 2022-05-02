import React, { useState } from 'react'
import { useEffect } from 'react';
import { Line } from "react-chartjs-2";

function LineGraph() {
    const [data, setData] = useState({})

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120

        useEffect(() => {
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                //clever stuff here...
                console.log(data);
            })
        }, [])

        const buildChartData = data => {
            const chartData = [];
            let lastDataPoint;

            data.cases.forEach(date => {
                if (lastDataPoint) {
                    const newDataPoint = {
                        x: date,
                        y: data['cases'][date] - lastDataPoint
                    }
                }
            })
        }

    return (
    <div>
        <h2>I am a graph</h2>
    </div>
  )
}

export default LineGraph

//React chart js 2 - npm instal --save react-chartjs-2 or npm i react-chartjs-2
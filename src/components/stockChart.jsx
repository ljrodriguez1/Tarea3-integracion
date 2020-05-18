import React from 'react'
import Chart from "react-google-charts";


export default function StocksChart(props) {

    let { data } = props

    let formated_data
    if (data) {
        if (data.price.length === 0) {
            formated_data = [['Time', 'Value'],[0,0]]
        } else {
            formated_data = [['Time', 'Value']]
        }
        for (const value of data.price) {
            let date = new Date(value.time)
            let point = [date, value.value]
            formated_data.push(point)
        }    
    } else {
        data = {"company_name": ""}
    }
    return (
        <Chart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={formated_data}
            options={{
            title: data.company_name,
            hAxis: { title: 'Time', titleTextStyle: { color: '#333' } },
            //vAxis: { minValue: 0 },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: '70%', height: '60%' },
            // lineWidth: 25
            explorer: {axis: 'horizontal', keepInBounds: true}
            }}
        />
    )
} 

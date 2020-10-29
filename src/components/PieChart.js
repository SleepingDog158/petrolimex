import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function PieChart(props) {
    const {creditLimit, creditUsed} = props
    const data= {
        labels: ['Đã sử dụng', 'Còn lại'],
        datasets: [
            {
                data: [75,25],
                backgroundColor:[
                    'rgba(255, 84, 5, 1)',
                    'rgba(54, 112, 211, 1)'
                    
                ]

            }
        ]
    }
    const options ={
        title:{
            display: true,
            text: 'Hạn mức công nợ'
        },
        
    }
    return <Doughnut data={data} options={options}/>
}

export default PieChart

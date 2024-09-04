// src/App.js
import React, { useEffect, useState } from 'react';
import './bar.scss'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { USER_ACTIVITY } from '../../../../../BACKEND/app/data';

// const data = [
//   {day: '2020-07-01', kilogram: 80, calories: 240},
//   {day: '2020-07-02', kilogram: 80, calories: 220},
//   {day: '2020-07-03', kilogram: 81, calories: 280},
//   {day: '2020-07-04', kilogram: 81, calories: 290},
//   {day: '2020-07-05', kilogram: 80, calories: 160},
//   {day: '2020-07-06', kilogram: 78, calories: 162},
//   {day: '2020-07-07', kilogram: 76, calories: 390}
// ];

//.then(datas => console.log(datas.data.sessions))
//{userId}

const App = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //   fetch(`http://localhost:3000/user/12/activity`)
    //   .then(response => response.json())
    //   .then()
      
    // })

    useEffect(() => {
        // Simulez la récupération des données
        const userId = 12;
        const userActivity = USER_ACTIVITY.find(activity => activity.userId === userId);
        if (userActivity) {
          setData(userActivity.sessions);
        }
      }, []);

    return (
        <div className="app">
            <div className="titleApp">
                <h2>Activité quotidienne</h2>
                <ul>
                    <li>Poids (kg)</li>
                    <li>Calories brûlées (kCal)</li>
                </ul>
            </div>
            <BarChart
                className="barChart"
                width={700}
                height={145}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip className="tooltip" />
                <Legend />
                <Bar dataKey="kilogram" fill="#282D30" />
                <Bar dataKey="calories" fill="#E60000" />
            </BarChart>
        </div>
    );
}

export default App;


/*
http://localhost:3000/user/${userId}/activity


<XAxis dataKey="day" />   // mettre l'ID 1, 2, 3,... 7
<Bar dataKey="kilogram" fill="#282D30" />
<Bar dataKey="calories" fill="#E60000" />




  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },

<XAxis dataKey="name" />
<Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
*/
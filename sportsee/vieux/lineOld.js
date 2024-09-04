import React, { useEffect, useState } from 'react';
import './line.scss';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraphicLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:3000/user/12/average-sessions`)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data.sessions);
      })
      .catch(error => {
        console.log(error);
      });
    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={258}
            height={263}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default GraphicLine;






// import React, { useEffect, useState } from 'react';
// import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// import './line.scss';

// const LineGraph = () => {
//     const [data, setData] = useState([]);
  
//     useEffect(() => {
//         fetch(`http://localhost:3000/user/12/average-sessions`)
//             .then(response => response.json())
//             .then(responseData => {
//             setData(responseData.data.sessions);
//             })
//             .catch(error => {
//             console.log(error);
//             });
//     }, []);
  
//     return (
//         <div className="graphiqueLigne">
//             <div className="titleApp">
//                 <h2>Durée moyenne des sessions</h2>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
                
//                 data={data}
//                 margin={{
//                 top: 10,
//                 right: 30,
//                 left: 0,
//                 bottom: 0,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="sessionLength" stroke="#ffffff" fill="#FF0000" />
//             </AreaChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };
  
// export default LineGraph;


import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './line.scss';
import { fetchUserSession } from '../../../service/api';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const LineGraph = ({ userId }) => {
    const [data, setData] = useState([]);
  
    // useEffect(() => {
    //     fetch(`http://localhost:3000/user/12/average-sessions`)
    //         .then(response => response.json())
    //         .then(responseData => {
    //         setData(responseData.data.sessions);
    //         })
    //         .catch(error => {
    //         console.log(error);
    //         });
    // }, []);

    // useEffect(() => {
    //     fetchUserSession(userId)
    //         .then(userData => {
    //           console.log('Data fetched for sessions:', userData);  // Diagnostic
    //           setData(userData);
    //         })
    //         .catch(error => {
    //           console.log('Erreur lors de la récupération des sessions moyennes:', error);
    //       });
    // }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserSession(userId);
                console.log('Data fetched for sessions:', userData);
                setData(userData);
            } catch (error) {
                console.log('Erreur lors de la récupération des sessions moyennes:', error);
            }
        };
        fetchData();
    }, [userId]);
  
    return (
        <div className="graphiqueLigne">
            <div className="titleApp">
                <h2>Durée moyenne des sessions</h2>
            </div>
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sessionLength" stroke="#ffffff" fill="#FF0000" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
  
export default LineGraph;
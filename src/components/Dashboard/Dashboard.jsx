import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdOutlineTrendingUp } from 'react-icons/md';
import blueImg from "../../assets/images/blue.png";
import greenImg from "../../assets/images/green.png";
import redImg from "../../assets/images/red.png";
import Logs from '../Logs/Logs';
import useTitle from '../../hooks/useTitle';

const Dashboard = () => {
    
    useTitle('Dashboard');
    const [statusData, setStatusData] = useState([]);
    const [interactionData, setInteractionData] = useState([]);
    const [emailCounts, setEmailCounts] = useState({
        Scheduled: 0,
        Sent: 0,
        Failed: 0,
        Opened: 0,
        Clicked: 0,
    });

    useEffect(() => {
        fetch('/logs.json')
            .then(res => res.json())
            .then(data => {
                // Process status data
                const statusCount = data.reduce((acc, item) => {
                    acc[item.status] = (acc[item.status] || 0) + 1;
                    return acc;
                }, {});

                const statusChartData = Object.keys(statusCount).map(key => ({
                    name: key,
                    value: statusCount[key]
                }));
                setStatusData(statusChartData);

                // Process opened and clicked data
                const interactionCount = {
                    Opened: data.filter(item => item.isOpen).length,
                    Clicked: data.filter(item => item.isChecked).length
                };

                const interactionChartData = Object.keys(interactionCount).map(key => ({
                    name: key,
                    value: interactionCount[key]
                }));
                setInteractionData(interactionChartData);

                // Update email counts
                setEmailCounts({
                    Scheduled: statusCount.Scheduled || 0,
                    Sent: statusCount.Sent || 0,
                    Failed: statusCount.Failed || 0,
                    Opened: interactionCount.Opened || 0,
                    Clicked: interactionCount.Clicked || 0,
                });
            })
            .catch(err => console.error('Error fetching data: ', err));
    }, []);

    const COLORS = {
        Sent: '#00C04b', // Green
        Scheduled: '#0165fc', // Blue
        Failed: '#FF4433' // Red
    };

    const openItemColors = {
        Opened: '#0165fc', // Green
        Clicked: '#00C04b', // Blue
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value}
            </text>
        );
    };

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold mb-5'>Dashboard</h1>
            <div className='flex gap-10'>
                <div className='w-[33%] border rounded-md shadow-md'>
                    <div className='m-4'>
                        <p>Email Scheduled</p>
                        <h6 className='text-4xl my-2 font-semibold'>{emailCounts.Scheduled}</h6>
                        <p className='text-blue-600'>{emailCounts.Scheduled} Email Scheduled <MdOutlineTrendingUp className='text-xl text-blue-600' /></p>
                    </div>
                    <img className='w-full' src={blueImg} alt="Email Scheduled" />
                </div>
                <div className='w-[33%] border rounded-md shadow-md'>
                    <div className='m-4'>
                        <p className='text-gray-500'>Email Sent</p>
                        <h6 className='text-4xl my-2 font-semibold'>{emailCounts.Sent}</h6>
                        <p className='text-green-600'>{emailCounts.Sent} Email Sent <MdOutlineTrendingUp className='text-xl text-green-600' /></p>
                    </div>
                    <img className='w-full' src={greenImg} alt="Email Sent" />
                </div>
                <div className='w-[34%] border rounded-md shadow-md'>
                    <div className='m-4'>
                        <p className='text-gray-500'>Email Failed</p>
                        <h6 className='text-4xl my-2 font-semibold'>{emailCounts.Failed}</h6>
                        <p className='text-red-600'>{emailCounts.Failed} Email Failed <MdOutlineTrendingUp className='text-xl text-red-600' /></p>
                    </div>
                    <img className='w-full' src={redImg} alt="Email Failed" />
                </div>
            </div>

            <div className='flex gap-5 mt-10'>
                <div className='w-[50%] border rounded-md p-3 shadow-md'>
                    <h2 className='text-xl font-bold'>Email logs Overview</h2>
                    <ResponsiveContainer width="100%" height={600}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={250}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-[50%] border rounded-md p-3 shadow-md'>
                <h2 className='text-xl font-bold'>Email logs Analytics</h2>
                    <ResponsiveContainer width="100%" height={600}>
                        <PieChart>
                            <Pie
                                data={interactionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={250}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {interactionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={openItemColors[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='mt-20 border rounded-r-md shadow-md'>
            <Logs></Logs>
            </div>
        </div>
    );
};

export default Dashboard;

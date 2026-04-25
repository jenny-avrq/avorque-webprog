import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from  '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { Typography, Card, CardContent, Button } from '@mui/material';

const socialStats = [
    { label: 'Spotify', value: 15989, color: '#d88fa3' },
    { label: 'YouTube', value: 7830, color: '#b96d84' },
    { label: 'Instagram', value: 25257, color: '#f3c7d3' },
    { label: 'Facebook', value: 40000, color: '#c08a99' },
    {label: 'TikTok', value: 187800, color: '#5c3a44'}
];

function ReportsPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Gauge */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px, solid, #e7b8c5',
                    boxShadow: '0 10px 30px rgba(216, 143, 163, 0.15)',
                }}
            >
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}>
                        Social Media Followers
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                                lg: 'repeat(5, 1fr)'
                            },
                            gap: 3,
                        }}
                    >
                        {socialStats.map((item) => (
                            <Box key={item.label} sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }} color="#5c3a44">
                                    {item.label}
                                </Typography>

                                <Gauge
                                    value={item.value}
                                    valueMax={200000}
                                    width={160}
                                    height={160}
                                    sx={{
                                        '& .MuiGauge-valueArc': {
                                            fill: item.color,
                                        },
                                        '& .MuiGauge-referenceArc': {
                                            fill: '#f8e3ea',
                                        },
                                        '& .MuiGauge-valueText': {
                                            fill: '#5c3a44',
                                            fontWeight: 700,
                                            fontSize: 16,
                                        },
                                    }}
                                />

                                <Typography
                                    variant='body2'
                                    sx={{ mt: 1, color: '#8a6670', fontWeight: 600 }}
                                >
                                    {item.value.toLocaleString()} followers
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Bar Graph */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px, solid, #e7b8c5',
                    boxShadow: '0 10px 30px rgba(216, 143, 163, 0.15)',
                }}
            >
                <CardContent>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={20} sx={{ mb: 4 }}>
                        <Box>
                            <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}>
                                Song Plays
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflowX: 'auto'
                                }}
                            >
                                <BarChart
                                    colors={['#c08a99']}
                                    series={[
                                        { 
                                            data: [144039, 503937, 120730, 62821], 
                                            label: 'Song Plays' 
                                        },
                                    ]}
                                    height={400}
                                    width={700}
                                    xAxis={[{ 
                                        data: ['Kahon', 'Bendahe', 'Sikreto', 'Tayo ay Bagay'], 
                                        scaleType: 'band', 
                                        label: 'Discography' 
                                    }]}
                                    sx={{
                                    '& .MuiChartsAxis-tickLabel': {
                                    fill: '#5c3a44',
                                    },
                                    '& .MuiChartsAxis-label': {
                                    fill: '#5c3a44',
                                    fontWeight: 700,
                                    },
                                    '& .MuiChartsLegend-label': {
                                    fill: '#5c3a44',
                                    },
                                }}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}>
                                Song Duration
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflowX: 'auto'
                                }}
                            >
                                <BarChart
                                    colors={['#c08a99']}
                                    series={[
                                        { 
                                            data: [316, 235, 233, 328], 
                                            label: 'Song Duration' 
                                        },
                                    ]}
                                    height={400}
                                    width={700}
                                    xAxis={[{ 
                                        data: ['Kahon', 'Bendahe', 'Sikreto', 'Tayo ay Bagay'], 
                                        scaleType: 'band', 
                                        label: 'Discography' 
                                    }]}
                                    yAxis={[
                                        {
                                            label: 'Duration',
                                            valueFormatter: (value) => {
                                                const minutes = Math.floor(value / 60);
                                                const seconds = value % 60;
                                                return `${minutes}:${String(seconds).padStart(2, '0')}`
                                            },
                                        },
                                    ]}
                                    sx={{
                                    '& .MuiChartsAxis-tickLabel': {
                                    fill: '#5c3a44',
                                    },
                                    '& .MuiChartsAxis-label': {
                                    fill: '#5c3a44',
                                    fontWeight: 700,
                                    },
                                    '& .MuiChartsLegend-label': {
                                    fill: '#5c3a44',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            {/* Pie Graph */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px, solid, #e7b8c5',
                    boxShadow: '0 10px 30px rgba(216, 143, 163, 0.15)',
                }}
            >
                <CardContent>
                    <Box>
                        <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}>
                            Listeners by City
                        </Typography>
                        <PieChart
                            colors={['#d88fa3', '#b96d84', '#f3c7d3', '#c08a99', '#5c3a44']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 3968, label: 'Quezon City' },
                                        { id: 1, value: 3033, label: 'Manila' },
                                        { id: 2, value: 1313, label: 'Makati City' },
                                        { id: 3, value: 1369, label: 'Caloocan' },
                                        { id: 4, value: 1336, label: 'Davao City' },
                                    ],
                                },
                            ]}
                            width={400}
                            height={400}
                            sx={{
                                '& .MuiChartsLegend-label': {
                                fill: '#5c3a44',
                                color: '#5c3a44',
                                },
                                '& text': {
                                fill: '#5c3a44',
                                },
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReportsPage
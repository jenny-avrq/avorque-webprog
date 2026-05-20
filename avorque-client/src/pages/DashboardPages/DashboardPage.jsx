import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';

import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from  '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';

import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { dashboardStyles as styles } from '../../assets/styles/dashboardStyles';

const cardStyle = {
    borderRadius: 4,
    border: '1px solid #e7b8c5',
    boxShadow: '0 10px 30px rgba(216, 143, 163, 0.15)',
};

const chartTextStyle = {
    '& .MuiChartsAxis-tickLabel': {
        fill: '#5c3a44',
    },
    '& .MuiChartsAxis-Label': {
        fill: '#5c3a44',
        fontWeight: 700,
    },
    '& .MuiChartsLegend-Label': {
        fill: '#5c3a44',
    },
    '& text': {
        fill: '#5c3a44',
    },
};

function DashboardPage() {
    const location = useLocation();

    return (
        <Stack spacing={3}>
            <Box>
                <Typography 
                    variant='h5' 
                    sx={styles.pageTitle}
                >
                    Dashboard
                </Typography>
            </Box>

            {/* Gauge and Charts */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Card sx={{ ...styles.card, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={styles.sectionTitle}
                        >
                            Spotify Followers
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Gauge 
                                width={250} 
                                height={250} 
                                value={15989} 
                                valueMax={50000}
                                sx={{
                                    '& .MuiGauge-valueArc': {
                                        fill: '#c08a99'
                                    },
                                    '& .MuiGauge-referenceArc': {
                                        fill: '#fff6f8'
                                    },
                                    '& .MuiGauge-valueText': {
                                        fill: '#5c3a44',
                                        fontWeight: 700,
                                    },
                                }}
                            />
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{ mt: 1, textAlign: 'center', color: '#8a6670', fontWeight: 600 }}
                        >
                            15,989 followers
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ ...styles.card, flex: 2 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={styles.sectionTitle}
                        >
                            Song Plays
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                            <BarChart
                                colors={['#c08a99']}
                                series={[
                                    { data: [144039, 503937, 120730, 62821] },
                                ]}
                                height={290}
                                width={600}
                                xAxis={[{ data: ['Kahon', 'Bendahe', 'Sikreto', 'Tayo ay Bagay'], scaleType: 'band', label: 'Discography' }]}
                                sx={chartTextStyle}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Stack>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                <Card sx={{ ...styles.card, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={styles.sectionTitle}
                        >
                            Listeners by City
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                width={250}
                                height={250}
                                sx={chartTextStyle}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* React Leaflet Map */}
                <Card sx={{ ...styles.card, flex: 1.5 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={styles.sectionTitle}
                        >
                            Location Map
                        </Typography>

                        <Box
                            sx={{
                                height: 360,
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: 3,
                                border: '1px solid #e7b8c5',
                            }}
                        >
                            <MapContainer
                                center={[14.641071, 121.031131]}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[14.641071, 121.031131]}>
                                    <Popup>
                                        Filtered Music <br />
                                        <p><i>1487 Quezon Avenue, Quezon City, Philippines</i></p>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
    );
}

export default DashboardPage;
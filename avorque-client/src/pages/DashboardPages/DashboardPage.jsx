import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';

import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from  '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';

import { DataGrid } from '@mui/x-data-grid';

import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Avorque', firstName: 'Jenny', age: '21' },
    { id: 2, lastName: 'Martin', firstName: 'Seth Marcus', age: '24' },
    { id: 3, lastName: 'Arcega', firstName: 'Arianne', age: '21' },
    { id: 4, lastName: 'Abner', firstName: 'Justin Bernard', age: '22' },
    { id: 5, lastName: 'Bernarte', firstName: 'Rei Andrew', age: '20' },
    { id: 6, lastName: 'Cosme', firstName: 'Gilianne', age: '21' },
    { id: 7, lastName: 'Firme', firstName: 'Marielle', age: '23' },
    { id: 8, lastName: 'Lasquite', firstName: 'Jaimie', age: '20' },
    { id: 9, lastName: 'Laso', firstName: 'Aseana', age: '23' },
];

const validRows = rows.filter(
    (row) => row.age !== null && row.age !== undefined && row.age !== ''
);

const averageAge =
    validRows.length > 0
        ? validRows.reduce((sum, row) => sum + Number(row.age), 0) / validRows.length
        : 0;

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
                    sx={{ fontWeight: 800, color: '#5c3a44' }}
                >
                    Dashboard
                </Typography>
            </Box>

            {/* Summary Section */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 700,
                                color: '#8a6670',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                            }}
                            >
                            Total Users
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, color: '#d88fa3' }}
                        >
                            {rows.length}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 700,
                                color: '#8a6670',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                            }}
                        >
                            Average Age
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, color: '#b96d84' }}
                        >
                            {averageAge.toFixed(1)}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            {/* Gauge and Charts */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
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

                <Card sx={{ ...cardStyle, flex: 2 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
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
                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
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
                <Card sx={{ ...cardStyle, flex: 1.5 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
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
            
            {/* DataGrid */}
            <Card sx={cardStyle}>
                <CardContent>
                    <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
                    >
                        User Overview
                    </Typography>

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                border: '1px solid #e7b8c5',
                                borderRadius: 3,
                                color: '#5c3a44',
                                overflow: 'hidden',

                                '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#fff6f8',
                                color: '#5c3a44',
                                fontWeight: 700,
                                },

                                '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 700,
                                },

                                '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#fff6f8',
                                },

                                '& .MuiDataGrid-row.Mui-selected': {
                                backgroundColor: '#f8e3ea',
                                },

                                '& .MuiDataGrid-row.Mui-selected:hover': {
                                backgroundColor: '#f3c7d3',
                                },

                                '& .MuiCheckbox-root.Mui-checked': {
                                color: '#d88fa3',
                                },

                                '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#fff6f8',
                                borderTop: '1px solid #e7b8c5',
                                color: '#5c3a44',
                                },
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default DashboardPage;
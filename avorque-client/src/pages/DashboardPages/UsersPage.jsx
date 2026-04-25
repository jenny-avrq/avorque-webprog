import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Box, { boxClasses } from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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
}

function UsersPage() {
    return (
        <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }} display='flex'>
                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography 
                            variant='subtitle2'
                            sx={{
                                mb: 1,
                                fontWeight: '#8a6670',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                            }}
                        >
                            Total Users
                        </Typography>

                        <Typography 
                            variant='h4'
                            sx={{ fontWeight: 800, color: '#d88fa3' }}
                        >
                            {rows.length}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ ...cardStyle, flex: 1 }}>
                    <CardContent>
                        <Typography 
                            variant='subtitle2'
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
                            variant='h4'
                            sx={{ fontWeight: 800, color: '#b96d84'}}
                        >
                            {averageAge.toFixed(1)}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            {/* DataGrid */}
            <Card sx={cardStyle}>
                <CardContent>
                    <Typography 
                        variant='h6'
                        sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
                    >
                        User Overview
                    </Typography>

                    <Box sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
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
    )
}

export default UsersPage;
import React, { useEffect, useMemo, useState } from 'react';
import { 
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    MenuItem,
    Modal,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { DataGrid } from '@mui/x-data-grid';

import { dashboardStyles as styles } from '../../assets/styles/dashboardStyles';
import { fetchGigs, createGig, updateGig, deleteGig } from '../../services/GigService';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: 'calc(100% - 32px)',
        sm: 720,
        md: 840,
    },
    maxHeight: '90vh',
    overflow: 'hidden',
    bgcolor: '#fff',
    border: '1px solid #e7b8c5',
    borderRadius: 4,
    boxShadow: '0 24px 70px rgba(92, 58, 68, 0.28)',
    p: 4,
};

const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        backgroundColor: '#fff',
        color: '#5c3a44',

        '& fieldset': {
        borderColor: '#e7b8c5',
        },

        '&:hover fieldset': {
        borderColor: '#d88fa3',
        },

        '&.Mui-focused fieldset': {
        borderColor: '#d88fa3',
        borderWidth: 2,
        },

        '&.Mui-error fieldset': {
            borderColor: '#ef4444',
        }
    },

    '& .MuiInputLabel-root': {
        color: '#8a6670',
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#b96d84',
    },

    '& .MuiInputLabel-root.Mui-error': {
        color: '#ef4444'
    },

    '& .MuiFormHelperText-root': {
        marginLeft: 1,
        color: '#ef4444',
        fontWeight: 500,
    },

    '& input[type="password"]::-ms-reveal': {
        display: 'none',
    },

    '& input[type="password"]::-ms-clear': {
        display: 'none',
    },

    '& input[type="date"]::-webkit-calendar-picker-indicator': {
        cursor: 'pointer',
        filter: 'invert(55%) sepia(16%) saturate(1020%) hue-rotate(295deg) brightness(92%) contrast(88%)',
    },
};

const filterStyle = {
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
        borderRadius: 999,
        backgroundColor: '#fff',
        color: '#5c3a44',

        '& fieldset': {
            borderColor: '#e7b8c5',
        },

        '&:hover fieldset': {
            borderColor: '#d88fa3',
        },

        '&.Mui-focused fieldset': {
            borderColor: '#d88fa3',
        },
    },
}

const blankGig = {
    title: '',
    production: '',
    image: '',
    venue: '',
    date: '',
    time: '',
    preSale: '',
    doorCharge: '',
    isPublished: true,
}

const statuses = ['published', 'draft'];

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const formatDate = (dateValue) => {
    if (!dateValue) return '';

    const date = new Date(dateValue);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
};

const DashArticleListPage = () => {
    const [gigs, setGigs] = useState([]);

    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editGigId, setEditGigId] = useState(null);

    const [gigForm, setGigForm] = useState(blankGig);
    const [imageFile, setImageFile] = useState(null);
    const [dateFocused, setDateFocused] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedGig, setSelectedGig] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const modalFieldProps = (name, label, extra = {}) => ({
        label,
        value: gigForm[name] || '',
        onChange: (event) =>
            setGigForm({ 
                ...gigForm,
                [name]: event.target.value,
            }),
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        sx: textFieldStyle,
        ...extra
    });

    const loadGigs = async () => {
        try {
            setLoading(true);

            const { data } = await fetchGigs();

            setGigs(data.gigs || []);
        } catch (error) {
            console.error('Error fetching gigs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGigs();
    }, []);

    const handleOpen = () => {
        setIsEditing(false); // Reset to "Add" mode
        setEditGigId(null);
        setGigForm(blankGig);
        setImageFile(null);
        setErrors({});
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditGigId(null);
        setGigForm(blankGig);
        setImageFile(null);
        setErrors({});
    }

    const handleEdit = (gig) => {
        setIsEditing(true);
        setEditGigId(gig._id);
        setGigForm({
            title: gig.title || '',
            production: gig.production || '',
            image: gig.image || '',
            venue: gig.venue || '',
            date: gig.date || '',
            time: gig.time || '',
            preSale: gig.preSale || '',
            doorCharge: gig.doorCharge || '',
            isPublished: gig.isPublished ?? true,
        });
        setImageFile(null);
        setErrors({})
        setOpen(true)
    };

    const handleSaveGig = async () => {
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);

            return;
        }

        try {
            const formData = new FormData();

            formData.append('title', gigForm.title.trim());
            formData.append('production', gigForm.production.trim());
            formData.append('venue', gigForm.venue.trim());
            formData.append('date', gigForm.date.trim());
            formData.append('time', gigForm.time.trim());
            formData.append('preSale', gigForm.preSale.trim());
            formData.append('doorCharge', gigForm.doorCharge.trim());
            formData.append('isPublished', gigForm.isPublished);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (isEditing) {
                await updateGig(editGigId, formData);
            } else {
                await createGig(formData);
            }

            await loadGigs();
            handleClose();
        } catch (error) {
           console.error('Error saving gig:', error.response?.data || error.message);

            setErrors({
                form: error.response?.data?.message || 'Unable to save gig.',
            });
        }
    };

    const handleTogglePublished = async (gig) => {
        try {
            await updateGig(gig._id, { isPublished: !gig.isPublished });
            await loadGigs(); // Reload users after toggling
        } catch (error) {
            console.error('Error updating publish status:', error);
        }
    };

    const openDeleteModal = (gig) => {
        setSelectedGig(gig);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedGig(null);
        setDeleteModalOpen(false);
        setIsDeleting(false);
    };

    const handleConfirmDelete = async () => {
        if (!selectedGig?._id) return;

        try {
            setIsDeleting(true);

            await deleteGig(selectedGig._id);
            await loadGigs();

            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting gig:', error.response?.data || error.message);
            setIsDeleting(false);
        }
    };

    const validate = () => {
        const nextErrors = {};

        if (!gigForm.title.trim()) {
            nextErrors.title = 'Gig title is required.';
        }

        if (!gigForm.production.trim()) {
            nextErrors.production = 'Production is required.';
        }

        if (!isEditing && !imageFile) {
           nextErrors.image = 'Gig image is required.';
        }

        if (!gigForm.venue.trim()) {
            nextErrors.venue = 'Venue is required.';
        }

        if (!gigForm.date.trim()) {
            nextErrors.date = 'Date is required.';
        }

        if (!gigForm.time.trim()) {
            nextErrors.time = 'Time is required.';
        }

        if (!gigForm.doorCharge.trim()) {
            nextErrors.doorCharge = 'Door charge is required.';
        }

        return nextErrors;
    };

    const filteredGigs = useMemo(() => {
        const searchValue = searchQuery.trim().toLowerCase();

        return gigs.filter((gig) => {
            const title = String(gig.title ?? '').toLowerCase();
            const production = String(gig.production ?? '').toLowerCase();
            const venue = String(gig.venue ?? '').toLowerCase();

            const matchesSearch =
                !searchValue ||
                title.includes(searchValue) ||
                production.includes(searchValue) ||
                venue.includes(searchValue)

            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'published' && gig.isPublished) ||
                (statusFilter === 'draft' && !gig.isPublished);

            return matchesSearch && matchesStatus;
        });
    }, [gigs, searchQuery, statusFilter]);

    const columns = [
    {
            field: 'title',
            headerName: 'Title',
            minWidth: 220,
            flex: 1,
        },
        {
            field: 'production',
            headerName: 'Production',
            minWidth: 180,
            flex: 1,
        },
        {
            field: 'image',
            headerName: 'Image',
            minWidth: 130,
            flex: 1,
        },
        {
            field: 'venue',
            headerName: 'Venue',
            minWidth: 180,
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Date',
            minWidth: 140,
            flex: 1,
            renderCell: (params) => formatDate(params.row.date),
        },
        {
            field: 'time',
            headerName: 'Time',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'preSale',
            headerName: 'Pre-Sale',
            minWidth: 110,
            flex: 1,
        },
        {
            field: 'doorCharge',
            headerName: 'Door Charge',
            minWidth: 110,
            flex: 1,
        },
        {
            field: 'isPublished',
            headerName: 'Status',
            minWidth: 150,
            renderCell: (params) => (
            <Box 
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Switch
                size="small"
                checked={Boolean(params.row.isPublished)}
                onChange={() => handleTogglePublished(params.row)}
                sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#d88fa3',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#d88fa3',
                    },
                }}
                />

                <Typography
                variant="body2"
                sx={{
                    fontWeight: 700,
                    color: params.row.isPublished ? '#166534' : '#6b7280',
                }}
                >
                {params.row.isPublished ? 'Published' : 'Hidden'}
                </Typography>
            </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
            <Box 
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Button
                size="small"
                variant="outlined"
                onClick={() => handleEdit(params.row)}
                sx={{
                    minWidth: 0,
                    height: 28,
                    px: 1.5,
                    py: 0,
                    borderRadius: 2,
                    borderColor: '#d88fa3',
                    color: '#b96d84',
                    backgroundColor: '#fff',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    '&:hover': {
                    borderColor: '#b96d84',
                    backgroundColor: '#fff6f8',
                    },
                }}
                >
                Edit
                </Button>

                <Button
                size="small"
                variant="contained"
                onClick={() => openDeleteModal(params.row)}
                sx={{
                    minWidth: 0,
                    height: 28,
                    px: 1.5,
                    py: 0,
                    borderRadius: 2,
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    '&:hover': {
                    backgroundColor: '#b91c1c',
                    },
                }}
                >
                Delete
                </Button>
            </Box>
            ),
        },  
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{ 
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' }
                }}
            >
                <Typography variant='h4' color="#5c3a44" sx={styles.pageTitle}>
                    Gigs
                </Typography>

                <Stack
                    direction={{ xs: 'column', lg: 'row' }}
                    spacing={1}
                    sx={{
                        width: { xs: '100%', lg: 'auto' },
                        alignItems: { xs: 'stretch', lg: 'center' },
                    }}
                >   
                    <TextField
                        size='small'
                        placeholder='Search Gigs'
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                        }}
                        sx={{
                            minWidth: { xs: '100%', lg: 260 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 999,
                                backgroundColor: '#fff',
                                color: '#5c3a44',

                                '& fieldset': {
                                    borderColor: '#e7b8c5',
                                },

                                '&:hover fieldset': {
                                    borderColor: '#d88fa3',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: '#d88fa3',
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon sx={{ color: '#b96d84'}} />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        select
                        size='small'
                        label='Status'
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(event.target.value);
                            setPaginationModel((prev) => ({ ...prev, page: 0 }));
                        }}
                        sx={filterStyle}
                    >
                        <MenuItem value='all'>All Gigs</MenuItem>
                        {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {labelize(status)}
                            </MenuItem>
                        ))}
                    </TextField>
   
                    <Button 
                        variant='contained' 
                        onClick={handleOpen} 
                        sx={styles.primaryButton}
                    >
                        Add Gig
                    </Button>
                </Stack>
            </Stack>

            <Stack spacing={3}>
                {/* DataGrid */}
                <Card sx={styles.card}>
                    <CardContent>
                        <Typography 
                            variant='h6'
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
                        >
                            Gig Overview
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: '#8a6670' }}>
                            Showing {filteredGigs.length} of {gigs.length} gigs
                        </Typography>
                            {loading ? (
                                <Box sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={[]}
                                        columns={columns}
                                        loading={loading}
                                        getRowId={(row) => row._id}
                                    />
                                </Box>
                            ) : filteredGigs.length ? (
                                <Box sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredGigs}
                                        columns={columns}
                                        getRowId={(row) => row._id}
                                        loading={loading}
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[5, 10]}
                                        paginationModel={paginationModel}
                                        onPaginationModelChange={setPaginationModel}
                                        sx={{
                                            border: '1px solid #e7b8c5',
                                            borderRadius: 3,
                                            color: '#5c3a44',
                                            overflow: 'hidden',

                                            '& .MuiDataGrid-cell': {
                                                display: 'flex',
                                                alignItems: 'center',
                                                minWidth: 0,
                                            },

                                            '& .MuiDataGrid-cellContent': {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            },

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
                            ) : (
                                <Alert severity='info'>
                                    No gigs found. Use Add Gig to create your first record.
                                </Alert>
                            )}
                    </CardContent>
                </Card>
            </Stack>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby='add-gig-modal'
                aria-describedby='add-gig-modal-description'
            >
                <Box sx={modalStyle}>
                    <Box 
                        sx={{
                            px: 4,
                            py: 3,
                            borderBottom: '1px solid #f0c7d2',
                            backgroundColor: '#fff6f8'
                        }}
                    >
                        <Typography 
                            id='add-gig-modal' 
                            variant='h5' 
                            sx={{
                                fontWeight: 800,
                                color: '#5c3a44',
                            }}
                        >
                            {isEditing ? 'Edit Gig' : 'Add Gig'}
                        </Typography>

                        <Typography
                            variant='body2'
                            sx={{
                                mt: 0.75,
                                color: '#8a6670',
                            }}
                        >
                            {isEditing
                                ? 'Update the selected gig information below.'
                                : 'Fill out the form below to create a new gig.'}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            px: 4,
                            py: 3,
                            maxHeight: '62vh',
                            overflowY: 'auto',
                            backgroundColor: '#fff',
                        }}
                    >
                        {errors.form && (
                            <Alert severity='error' sx={{ mb: 2 }}>
                                {errors.form}
                            </Alert>
                        )}

                        <Stack spacing={2.25}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('title', 'Gig Title')}
                                />

                                <TextField
                                    {...modalFieldProps('production', 'Production')}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='flex-start'>
                                <TextField
                                    label='Gig Image'
                                    value={
                                        imageFile
                                            ? imageFile.name
                                            : gigForm.image
                                                ? gigForm.image.split('/').pop()
                                                : ''
                                    }
                                    placeholder='Choose Image'
                                    error={Boolean(errors.image)}
                                    helperText={errors.image}
                                    fullWidth
                                    sx={textFieldStyle}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Button
                                                        component='label'
                                                        size='smalle'
                                                        sx={{
                                                            minWidth: 0,
                                                            borderRadius: 999,
                                                            px: 2,
                                                            py: 0.5,
                                                            color: '#b96d84',
                                                            fontWeight: 700,
                                                            textTransform: 'none',
                                                            backgroundColor: '#fff6f8',
                                                            border: '1px solid #e7b8c5',
                                                            '&:hover': {
                                                                backgroundColor: '#f3c7d3',
                                                                borderColor: '#d88fa3',
                                                            },
                                                        }}
                                                    >
                                                        Browse
                                                        <input
                                                            type='file'
                                                            accept='image/png, image/jpeg, image/jpg, image/webp'
                                                            hidden
                                                            onChange={(event) => {
                                                                const file = event.target.files[0];

                                                                if (file) {
                                                                    setImageFile(file);
                                                                    setErrors((prev) => ({
                                                                        ...prev,
                                                                        image: '',
                                                                    }));
                                                                }
                                                            }}
                                                        />
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <TextField
                                    {...modalFieldProps('venue', 'Venue')}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label='Date'
                                    type={dateFocused || gigForm.date ? 'date' : 'text'}
                                    value={gigForm.date || ''}
                                    onFocus={() => setDateFocused(true)}
                                    onBlur={() => {
                                        if (!gigForm.date) {
                                            setDateFocused(false);
                                        }
                                    }}
                                    onChange={(event) =>
                                        setGigForm({
                                            ...gigForm,
                                            date: event.target.value,
                                        })
                                    }
                                    error={Boolean(errors.date)}
                                    helperText={errors.date}
                                    fullWidth
                                    sx={textFieldStyle}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: dateFocused || Boolean(gigForm.date),
                                        },
                                    }}
                                />

                                <TextField
                                    {...modalFieldProps('time', 'Time')}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('preSale', 'Pre-Sale')}
                                />

                                <TextField
                                    {...modalFieldProps('doorCharge', 'Door Charge')}
                                />
                            </Stack>

                            <Box
                                sx={{
                                    mt: 1,
                                    rounded: 3,
                                    border: '1px solid #f0c7d2',
                                    backgroundColor: '#fff6f8',
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: 3,
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Switch
                                        checked={Boolean(gigForm.isPublished)}
                                        onChange={(event) =>
                                            setGigForm({ 
                                                ...gigForm, 
                                                isPublished: event.target.checked 
                                            })
                                        }
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#d88fa3',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#d88fa3',
                                            },
                                        }}
                                    />
                                
                                    <Typography sx={{ color: '#5c3a44', fontWeight: 600 }}>
                                        {gigForm.isPublished ? 'Published' : 'Draft'}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>

                    <Box 
                        sx={{ 
                            px: 4,
                            py: 2.5,
                            borderTop: '1px solid #f0c7d2',
                            backgroundColor: '#fff6f8',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1.5,
                        }}
                    >
                        <Button 
                            onClick={handleClose}
                            sx={{
                                color: '#8a6670',
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: 999,
                                px: 3,
                                '&:hover': {
                                    backgroundColor: '#f8e3ea',
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        
                        <Button 
                            variant='contained' 
                            onClick={handleSaveGig} 
                            sx={styles.primaryButton}
                        >
                            {isEditing ? 'Save Changes' : 'Add Gig'}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Dialog
                open={deleteModalOpen && Boolean(selectedGig)}
                onClose={closeDeleteModal}
                maxWidth='sm'
                fullWidth
                PaperProps={{
                    sx: {
                        width: '100%',
                        maxWidth: 560,
                        borderRadius: 6,
                        border: '1px solid #e7b8c5',
                        boxShadow: '0 24px 70px rgba(92, 58, 68, 0.28)',
                        overflow: 'hidden',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: '#fff6f8',
                        borderBottom: '1px solid #f0c7d2',
                        color: '#5c3a44',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 3,
                        py: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            minWidth: 44,
                            height: 44,
                            borderRadius: '50%',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <WarningAmberIcon />
                    </Box>

                    Delete Gig
                </DialogTitle>

                <DialogContent
                    sx={{
                        px: 4,
                        py: 4.5,
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography sx={{ color: '#5c3a44', fontWeight: 700, pt: 4 }}>
                        Are you sure you want to delete this gig?
                    </Typography>

                    <Typography sx={{ mt: 1, color: '#8a6670', lineHeight: 1.7 }}>
                        This will permanently remove{' '}
                        <strong>{selectedGig?.title || 'this gig'}</strong> from the database.
                        This action cannot be undone.
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 4,
                        py: 3,
                        backgroundColor: '#fff6f8',
                        borderTop: '1px solid #f0c7d2',
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={closeDeleteModal}
                        disabled={isDeleting}
                        sx={{
                            color: '#8a6670',
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: 999,
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#f8e3ea',
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        sx={{
                            borderRadius: 999,
                            backgroundColor: '#dc2626',
                            color: '#fff',
                            fontWeight: 700,
                            textTransform: 'none',
                            px: 3,
                            boxShadow: '0 8px 18px rgba(220, 38, 38, 0.25)',
                            '&:hover': {
                                backgroundColor: '#b91c1c',
                            },
                        }}
                    >
                        {isDeleting ? 'Deleting' : 'Delete Gig'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashArticleListPage;
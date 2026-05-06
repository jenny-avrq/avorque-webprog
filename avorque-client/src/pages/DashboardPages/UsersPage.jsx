import React, { useMemo, useState } from 'react';
import { 
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';
import { dashboardStyles as styles } from '../../assets/styles/dashboardStyles';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users from src/assets/users.json.',
        };
    }
};

const seed = loadUsers();

const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
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
    },

    '& input[type="password"]::-ms-reveal': {
        display: 'none',
    },

    '& input[type="password"]::-ms-clear': {
        display: 'none',
    },

    '& .MuiInputLabel-root': {
        color: '#8a6670',
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#b96d84',
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

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(seed.users);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        
        const firstName = form.firstName.trim();
        const lastName = form.lastName.trim();
        const age = form.age.trim();
        const gender = form.gender.trim().toLowerCase();
        const email = form.email.trim().toLowerCase();
        const contactNumber = form.contactNumber.trim();
        const address = form.address.trim();
        const role = form.role.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();
        const password = form.password;

        [
            ['firstName', 'First Name'],
            ['lastName', 'Last Name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['email', 'Email Address'],
            ['contactNumber', 'Contact Number'],
            ['address', 'Address'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!nextErrors.firstName && !/^[A-Za-z\s]+$/.test(firstName)) {
            nextErrors.firstName = 'First name must contain letters only.';
        }

        if (!nextErrors.lastName && !/^[A-Za-z\s]+$/.test(lastName)) {
            nextErrors.lastName = 'Last name must contain letters only.';
        }

        const numericAge = Number(age);

        if (isNaN(numericAge)) {
            nextErrors.age = 'Age must be a number.';
        } else if (numericAge < 1 || numericAge > 120) {
            nextErrors.age = 'Age must be between 1 and 120.';
        }

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
            nextErrors.email = 'Email address already exists.';
        }

        if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
            nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
        }

        if (!nextErrors.username && /\s/.test(username)) {
            nextErrors.username = 'Username must not contain spaces.';
        }

        if (!nextErrors.user && username.length < 4) {
            nextErrors.username = 'Username must be at least 4 characters.';
        }

        if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
            nextErrors.username = 'Username already exists.';
        }

        if (!nextErrors.password && password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
        }

        if(!nextErrors.password && !/[A-Za-z]/.test(password)) {
            nextErrors.password = 'Password must contain at least one letter.';
        }
        
        if(!nextErrors.password && !/\d/.test(password)) {
            nextErrors.password = 'Password must contain at least one number.';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim().toLowerCase(),
            email: form.email.trim().toLowerCase(),
            contactNumber: form.contactNumber.trim(),
            address: form.address.trim(),
            role: form.role.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
            password: form.password,
            isActive: form.isActive,
        };

        setUsers((prev) =>
            modal.id
                ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user ))
                : [
                    ...prev,
                    {
                        id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
                        ...nextUser,
                    },
                ]
        );

        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, isActive: !user.isActive } : user
            )
        );
    };

    const filteredUsers = useMemo(() => {
        const searchValue = searchQuery.trim().toLowerCase();

        return users.filter((user) => {
            const firstName = String(user.firstName ?? '').toLowerCase();
            const lastName = String(user.lastName ?? '').toLowerCase();
            const email = String(user.email ?? '').toLowerCase();
            const username = String(user.username ?? '').toLowerCase();
            const role = String(user.role ?? '').toLowerCase();
            const gender = String(user.gender ?? '').toLowerCase();

            const matchesSearch =
                !searchValue ||
                firstName.toLowerCase().includes(searchValue) ||
                lastName.toLowerCase().includes(searchValue) ||
                email.toLowerCase().includes(searchValue) ||
                username.toLowerCase().includes(searchValue);

            const matchesRole = roleFilter === 'all' || role === roleFilter;

            const matchesGender = genderFilter === 'all' || gender === genderFilter

            const matchesStatus =
                statusFilter === 'all' || 
                (statusFilter === 'active' && user.isActive) ||
                (statusFilter === 'inactive' && !user.isActive);

            return matchesSearch && matchesRole && matchesGender && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, genderFilter, statusFilter]);

    const resetGridPage = () => {
        setPaginationModel((prev) => ({
            ...prev,
            page: 0,
        }));
    };

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 170,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'age', headerName: 'Age', width: 90 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 110,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'email', headerName: 'Email Address', flex: 1.1, minWidth: 220 },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,
            valueGetter: (_, row) => labelize(row.role),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="medium"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'default'}
                    variant={row.isActive? 'filled' : 'outlined'}
                    sx={{
                        backgroundColor: row.isActive ? '#dcfce7' : '#f3f4f6',
                        color: row.isActive ? '#166534' : '#6b7280',
                        fontWeight: 700,
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 220,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => openModal(row)}
                        sx={{
                            borderColor: '#d88fa3',
                            color: '#b96d84',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 2,
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
                        color={row.isActive ? 'warning' : 'success'}
                        onClick={() => toggleStatus(row.id)}
                        sx={{
                            color: '#fff6f8',
                            textTransform: 'none',
                            borderRadius: 2,
                            width: '20px',
                            backgroundColor: row.isActive ? '#f59e0b' : '#16a34a',
                            '&:hover': {
                                backgroundColor: row.isActive ? '#d97706' : '#15803d',
                            },
                        }}
                    >
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
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
                    Users
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
                        placeholder='Search Users'
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            resetGridPage();
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
                        label='Role'
                        value={roleFilter}
                        onChange={(event) => {
                            setRoleFilter(event.target.value);
                            resetGridPage();
                        }}
                        sx={filterStyle}
                    >
                        <MenuItem value='all'>All Roles</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {labelize(role)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        size='small'
                        label='Gender'
                        value={genderFilter}
                        onChange={(event) => {
                            setGenderFilter(event.target.value);
                            resetGridPage();
                        }}
                        sx={filterStyle}
                    >
                        <MenuItem value='all'>All Genders</MenuItem>
                        {genders.map((gender) => (
                            <MenuItem key={gender} value={gender}>
                                {labelize(gender)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        size='small'
                        label='Status'
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(event.target.value);
                            resetGridPage();
                        }}
                        sx={filterStyle}
                    >
                        <MenuItem value='all'>All Status</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                    </TextField>

                    <Button
                        variant="outlined"
                        sx={styles.outlinedButton}
                        onClick={() => {
                            setSearchQuery('');
                            setRoleFilter('all');
                            setGenderFilter('all');
                            setStatusFilter('all');
                            resetGridPage();
                        }}
                    >
                        Reset Filters
                    </Button>

                    <Button 
                        variant='contained' 
                        onClick={() => openModal()} 
                        sx={styles.primaryButton}
                    >
                        Add User
                    </Button>
                </Stack>
            </Stack>

            {seed.error ? (
                <Alert severity='error' sx={{ mb: 2}}>
                    {seed.error}
                </Alert>
            ) : null}

            <Stack spacing={3}>
                {/* DataGrid */}
                <Card sx={styles.card}>
                    <CardContent>
                        <Typography 
                            variant='h6'
                            sx={{ mb: 2, fontWeight: 700, color: '#5c3a44' }}
                        >
                            User Overview
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: '#8a6670' }}>
                            Showing {filteredUsers.length} of {users.length} users
                        </Typography>

                            {filteredUsers.length ? (
                                <Box sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredUsers}
                                        columns={columns}
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[5, 10]}
                                        paginationModel={paginationModel}
                                        onPaginationModelChange={setPaginationModel}
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
                            ) : (
                                <Alert severity='info'>
                                    No users found. Use Add User to create your first record.
                                </Alert>
                            )}
                    </CardContent>
                </Card>
            </Stack>

            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                fullScreen={isMobile}
                maxWidth="md"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: isMobile ? 0 : 4,
                            border: '1px solid #e7b8c5',
                            boxShadow: '0 20px 60px rgba(92, 58, 68, 0.25)',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                        },
                    },
                }}
            >
                <Box component='form' onSubmit={handleSubmit}>
                    <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
                    <DialogContent dividers sx={{ pt: 1 }}>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name')} sx={textFieldStyle} />
                                <TextField {...fieldProps('lastName', 'Last Name')} sx={textFieldStyle} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField 
                                    { ...fieldProps('age', 'Age', {
                                        inputMode: 'numeric',
                                    })} 
                                    sx={textFieldStyle} 
                                />
                                <TextField {...fieldProps('gender', 'Gender', { select: true})} sx={textFieldStyle}>
                                    {genders.map((gender) => (
                                        <MenuItem key={gender} value={gender}>
                                            {labelize(gender)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} sx={textFieldStyle} />
                                <TextField 
                                    {...fieldProps('contactNumber', 'Contact Number', {
                                        inputMode: 'numeric',
                                        placeholder: '09XXXXXXXXX',
                                    })} 
                                    sx={textFieldStyle} 
                                />
                            </Stack>
                            <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3})} sx={textFieldStyle} />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('role', 'Role', { select: true })} sx={textFieldStyle}>
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {labelize(role)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField {...fieldProps('username', 'Username')} sx={textFieldStyle} />
                            </Stack>
                            <TextField
                                {...fieldProps('password', 'Password', {
                                    type: showPassword ? 'text' : 'password',
                                    slotProps: {
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        onMouseDown={(event) => event.preventDefault()}
                                                        aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                })}
                                sx={textFieldStyle}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        name='isActive'
                                        checked={form.isActive}
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#d88fa3',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#d88fa3',
                                            },
                                        }}
                                    />
                                }
                                label={form.isActive ? 'User Status: Active' : 'User Status: Inactive'}
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions 
                        sx={{ 
                            px: 3, 
                            py: 2,
                            borderTop: '1px solid #f0c7d2',
                            backgroundColor: '#fff6f8',
                        }}
                    >
                        <Button 
                            onClick={closeModal}
                            sx={{
                                color: '#8a6670',
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: 2,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' variant='contained' sx={styles.primaryButton}>
                            {modal.id ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
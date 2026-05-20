import React, { useDebugValue, useEffect, useMemo, useState } from 'react';
import { 
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    DialogActions,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid } from '@mui/x-data-grid';

import { dashboardStyles as styles } from '../../assets/styles/dashboardStyles';
import { fetchUsers, createUser, updateUser as updateUserService, deleteUser } from '../../services/UserService';

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

    '& MuiInputLabel-root.Mui-error': {
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
    const roles = ['admin', 'editor', 'viewer'];
    const genders = ['male', 'female', 'others'];

    const blankUser = {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        type: 'viewer',
        username: '',
        password: '',
        isActive: true,
    }

    const labelize = (value) => 
        value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(blankUser);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const modalFieldProps = (name, label, extra = {}) => ({
        label,
        value: newUser[name] || '',
        onChange: (event) =>
            setNewUser({ 
                ...newUser,
                [name]: event.target.value,
            }),
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        sx: textFieldStyle,
        ...extra
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    

    const loadUsers = async () => {
        try {
            setLoading(true);

            const { data } = await fetchUsers();

            const loadedUsers = Array.isArray(data) ? data : data.users || [];

            setUsers(loadedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleOpen = () => {
        setIsEditing(false); // Reset to "Add" mode
        setEditUserId(null);
        setNewUser(blankUser);
        setErrors({});
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditUserId(null);
        setNewUser(blankUser);
        setErrors({});
        setShowPassword(false);
    }

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user._id === id);

        if (userToEdit) {
            setNewUser({ 
                ...blankUser, 
                ...userToEdit,
                password: '' 
            }); // Set password to an empty string

            setEditUserId(id); // Track the user being edited
            setIsEditing(true); // Switch to "Edit" mode
            setErrors({});
            setOpen(true); // Open the modal
        }
    };

    const handleSaveUser = async () => {
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);

            return;
        }

        try {
            const payload = {
                firstName: newUser.firstName.trim(),
                lastName: newUser.lastName.trim(),
                age: newUser.age.trim(),
                gender: newUser.gender.trim().toLowerCase(),
                contactNumber: newUser.contactNumber.trim(),
                email: newUser.email.trim().toLowerCase(),
                address: newUser.address.trim(),
                type: newUser.type || 'viewer',
                username: newUser.username.trim().toLowerCase(),
                password: newUser.password,
                isActive: newUser.isActive,
            }

            if (isEditing && !payload.password) {
                delete payload.password;
            }

            if (isEditing) {
                await updateUserService(editUserId, payload);
            } else {
                await createUser(payload);
            }

            await loadUsers();
            handleClose();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            await updateUserService(id, { isActive: !isActive });
            loadUsers(); // Reload users after toggling
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const validate = () => {
        const nextErrors = {};
        
        const firstName = newUser.firstName.trim();
        const lastName = newUser.lastName.trim();
        const age = newUser.age.trim();
        const gender = newUser.gender.trim().toLowerCase();
        const email = newUser.email.trim().toLowerCase();
        const contactNumber = newUser.contactNumber.trim();
        const address = newUser.address.trim();
        const type = newUser.type.trim().toLowerCase();
        const username = newUser.username.trim().toLowerCase();
        const password = newUser.password;

        if (!firstName) nextErrors.firstName = 'First Name is required.';
        if (!lastName) nextErrors.lastName = 'Last Name is required.';
        if (!age) nextErrors.age = 'Age is required.';
        if (!gender) nextErrors.gender = 'Gender is required.';
        if (!email) nextErrors.email = 'Email Address is required.';
        if (!contactNumber) nextErrors.contactNumber = 'Contact Number is required.';
        if (!address) nextErrors.address = 'Address is required.';
        if (!type) nextErrors.type = 'Role is required.';
        if (!username) nextErrors.username = 'Username is required.';

        if (!isEditing && !password) {
            nextErrors.password = 'Password is required.';
        }

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

        if (!nextErrors.email && users.some((user) => user._id !== editUserId && user.email === email)) {
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

        if (!nextErrors.username && users.some((user) => user._id !== editUserId && user.username === username)) {
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

    const filteredUsers = useMemo(() => {
        const searchValue = searchQuery.trim().toLowerCase();

        return users.filter((user) => {
            const firstName = String(user.firstName ?? '').toLowerCase();
            const lastName = String(user.lastName ?? '').toLowerCase();
            const email = String(user.email ?? '').toLowerCase();
            const username = String(user.username ?? '').toLowerCase();
            const type = String(user.type ?? '').toLowerCase();
            const gender = String(user.gender ?? '').toLowerCase();

            const matchesSearch =
                !searchValue ||
                firstName.toLowerCase().includes(searchValue) ||
                lastName.toLowerCase().includes(searchValue) ||
                email.toLowerCase().includes(searchValue) ||
                username.toLowerCase().includes(searchValue);

            const matchesRole = roleFilter === 'all' || type === roleFilter;

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

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 170,
            renderCell: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'email', headerName: 'Email', minWidth: 220, flex: 1 },
        { field: 'age', headerName: 'Age', width: 90, flex: 1, sortable: true },
        { field: 'gender', headerName: 'Gender', width: 110, flex: 1, sortable: true },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160, flex: 1 },
        { field: 'address', headerName: 'Address', minWidth: 150, flex: 1 },
        { field: 'type', headerName: 'Role', minWidth: 110, flex: 1, sortable: true },
        { field: 'username', headerName: 'Username', width: 150, flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 230,
            flex: 1,
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
                        onClick={() => handleEdit(params.row._id)}
                        sx={{
                            minWidth: 0,
                            height: 28,
                            px: 2.5,
                            py: 0.5,
                            borderRadius: 3,
                            borderColor: '#d88fa3',
                            color: '#b96d84',
                            backgroundColor: '#fff',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            lineHeight: 1,
                            '&:hover': {
                                borderColor: '#b96d84',
                                backgroundColor: '#fff6f8',
                            },
                        }}
                    >
                        Edit
                    </Button>

                    <Switch
                        checked={Boolean(params.row.isActive)}
                        onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
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
                        variant='body2'
                        sx={{
                            fontWeight: 700,
                            color: params.row.isActive ? '#166534' : '#6b7280',
                            minWidth: 60,
                        }}
                    >
                        {params.row.isActive ? 'Active' : 'Inactive'}
                    </Typography>
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
                        onClick={handleOpen} 
                        sx={styles.primaryButton}
                    >
                        Add User
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
                            User Overview
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2, color: '#8a6670' }}>
                            Showing {filteredUsers.length} of {users.length} users
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
                            ) : filteredUsers.length ? (
                                <Box sx={{ height: 650, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredUsers}
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

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby='add-user-modal'
                aria-describedby='add-user-modal-description'
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
                            id='add-user-modal' 
                            variant='h5' 
                            sx={{
                                fontWeight: 800,
                                color: '#5c3a44',
                            }}
                        >
                            {isEditing ? 'Edit user' : 'Add User'}
                        </Typography>

                        <Typography
                            variant='body2'
                            sx={{
                                mt: 0.75,
                                color: '#8a6670',
                            }}
                        >
                            {isEditing
                                ? 'Update the selected user information below.'
                                : 'Fill out the form below to create a new user account.'}
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
                                    {...modalFieldProps('firstName', 'First Name')}
                                />

                                <TextField
                                    {...modalFieldProps('lastName', 'Last Name')}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('age', 'Age', {
                                        inputMode: 'numeric',
                                    })}
                                />

                                <TextField
                                    {...modalFieldProps('gender', 'Gender', {
                                        select: true,
                                    })}
                                >
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="others">Others</MenuItem>
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('contactNumber', 'Contact Number', {
                                        inputMode: 'numeric',
                                        placeholder: '09XXXXXXXXX',
                                    })}
                                />

                                <TextField
                                    {...modalFieldProps('address', 'Address', {
                                        multiline: true,
                                    })}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('email', 'Email', {
                                        type: 'email',
                                    })}
                                />

                                <TextField
                                    {...modalFieldProps('type', 'Role', {
                                        select: true,
                                    })}
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='editor'>Editor</MenuItem>
                                    <MenuItem value='viewer'>Viewer</MenuItem>
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...modalFieldProps('username', 'Username')}
                                />

                                <TextField
                                    label={isEditing ? 'New Password (Optional)' : 'Password'}
                                    type={showPassword ? 'text' : 'password'}
                                    value={newUser.password || ''}
                                    onChange={(event) =>
                                        setNewUser({
                                            ...newUser,
                                            password: event.target.value,
                                        })
                                    }
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    fullWidth
                                    sx={textFieldStyle}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        onMouseDown={(event) => event.preventDefault()}
                                                        aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={Boolean(newUser.isActive)}
                                            onChange={(event) =>
                                                setNewUser({ 
                                                    ...newUser, 
                                                    isActive: event.target.checked 
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
                                    }
                                    label={newUser.isActive ? 'User Status: Active' : 'User Status: Inactive'}
                                    sx={{
                                        color: '#5c3a44',
                                        fontWeight: 600,
                                    }}
                                />
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
                            onClick={handleSaveUser} 
                            sx={styles.primaryButton}
                        >
                            {isEditing ? 'Save Changes' : 'Add User'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default UsersPage;
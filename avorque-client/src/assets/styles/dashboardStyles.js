export const dashboardStyles = {
    pageTitle: {
        fontWeight: 800,
        color: '#5c3a44',
    },

    pageSubtitle: {
        mt: 1,
        color: '#8a6670',
        maxWidth: 720,
    },

    card: {
        borderRadius: 4,
        border: '1px solid #e7b8c5',
        boxShadow: '0 10px 30px rgba(216, 143, 163, 0.15)',
    },

    sectionTitle: {
        mb: 2,
        fontWeight: 700,
        color: '#5c3a44',
    },

    sectionSubTitle: {
        mb: 2,
        fontWeight: 680,
        color: '#5c3a44',
    },

    primaryButton: {
        borderRadius: '25px',
        backgroundColor: '#d88fa3',
        color: '#fff',
        fontWeight: 700,
        textTransform: 'none',
        minWidth: '115px',
        boxShadow: '0 8px 18px rgba(216, 143, 163, 0.25)',
        '&:hover': {
            backgroundColor: '#b96d84',
        },
    },

    outlinedButton: {
        borderRadius: '25px',
        borderColor: '#d88fa3',
        color: '#b96d84',
        fontWeight: 700,
        textTransform: 'none',
        minWidth: '115px',
        backgroundColor: '#fff',
        '&:hover': {
            borderColor: '#b96d84',
            backgroundColor: '#fff6f8',
        },
    },
};
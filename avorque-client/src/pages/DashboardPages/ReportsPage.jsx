import React, { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from  '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { dashboardStyles as styles } from '../../assets/styles/dashboardStyles';

const socialStats = [
    { label: 'Spotify', value: 15989, color: '#d88fa3' },
    { label: 'YouTube', value: 7830, color: '#b96d84' },
    { label: 'Instagram', value: 25257, color: '#f3c7d3' },
    { label: 'Facebook', value: 40000, color: '#c08a99' },
    {label: 'TikTok', value: 187800, color: '#5c3a44'}
];

const chartTextStyle = {
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
    '& text': {
        fill: '#5c3a44',
    },
};

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;

        if (!printContent) {
            return;
        }

        const printWindow = window.open('', '_blank', 'width=1200,height=900');

        if (!printWindow) {
            return;
        }

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Print Report</title>
                    ${headMarkup}
                    <style>
                        @page {
                            size: A4;
                            margin: 16mm;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        body {
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                            background: #fff;
                            color: #5c3a44;
                        }

                        .report-shell {
                            padding: 28px;
                        }

                        .report-header {
                            margin-bottom: 24px;
                            padding-bottom: 14px;
                            border-bottom: 1px solid #d1d5db;
                        }

                        .report-header h1 {
                            margin: 0 0 6px;
                            font-size: 28px;
                            font-weight: 700;
                        }

                        .report-header p {
                            margin: 0;
                            font-size: 14px;
                            color: #6b7280;;
                            line-height: 1.5;
                        }

                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 1px solid #e5e7eb;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .report-content .MuiCardContent-root {
                            padding: 20px;
                        }

                        .report-content svg {
                            max-width: 100%
                        }
                    </style>
                </head>
                <body>
                    <main class="report-shell">
                        <header class="report-header">
                            <h1>Reports Summary</h1>
                            <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
                            <p>Prepared on ${exportedAt}</p>
                        </header>
                        <section class="report-content">
                            ${printContent.outerHTML}
                        </section>
                    </main>
                </body>
            </html>
        `);

        printWindow.document.close();

        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{ 
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', md: 'center' }
                }}
            >
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography variant='h4' color="#5c3a44" sx={styles.pageTitle}>
                        Reports
                    </Typography>

                    <Typography variant='body1' sx={{ ...styles.pageSubtitle, whiteSpace: 'normal', overflowWrap: 'break-word', }}>
                        Report analytics overview showing generated reports, and category breakdown.
                    </Typography>
                </Box>

                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={1} 
                    useFlexGap sx={{ flexWrap: 'wrap' }}
                    sx={{
                        flexWrap: { xs: 'nowrap', sm: 'wrap' },
                        width: { xs: '100%', md: 'auto' },
                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    }}
                >
                    <Button variant='contained' sx={styles.primaryButton}>Generate</Button>
                    <Button variant='outlined' onClick={handlePrint} sx={styles.outlinedButton}>Export</Button>
                    <Button variant='outlined' sx={styles.outlinedButton}>Filter</Button>
                </Stack>
            </Stack>

            <Box ref={printRef} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Reports Summary */}
                <Card sx={styles.card}>
                    <CardContent>
                        <Typography variant='h6' sx={styles.sectionTitle}>
                            Reports Summary
                        </Typography>

                        <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ alignItems: 'stretch' }}>
                            <Card sx={styles.card}>
                                <CardContent>
                                    <Typography variant='subtitle1' sx={styles.sectionSubTitle}>
                                        Monthly Report Output
                                    </Typography>
                                    
                                    <Typography variant='body1' sx={{ mb: 3, color: '#8a6670' }}>
                                        This chart compares how many reports were generated and how many were completed across the last four months.
                                    </Typography>

                                    <BarChart
                                        colors={['#d88fa3', '#b96d84']}
                                        series={[
                                            { data: [18, 24, 20, 27], label: "Generated" },
                                            { data: [12, 19, 17, 23], label: "Completed" },
                                        ]}
                                        height={300}
                                        xAxis={[
                                            {
                                                data: ["January", "February", "March", "April"],
                                                scaleType: "band",
                                                label: "Months",
                                            },
                                        ]}
                                        sx={{
                                            '& .MuiChartsAxis-tickLabel': {
                                                fill: '#5c3a44'
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
                                </CardContent>
                            </Card>

                            <Card sx={styles.card}>
                                <CardContent>
                                    <Typography variant='subtitle1' sx={styles.sectionSubTitle}>
                                        Completion Rate
                                    </Typography>

                                    <Typography variant='body1' sx={{ mb: 3, color:'#8a6670' }}>
                                        The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
                                    </Typography>

                                    <Box
                                        sx={{
                                            minHeight: 300,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Gauge 
                                            width={260} 
                                            height={260} 
                                            value={78}
                                            sx={{
                                                '& .MuiGauge-valueArc': {
                                                    fill: '#d88fa3',
                                                },
                                                '& .MuiGauge-referenceArc': {
                                                    fill: '#f8e3ea',
                                                },
                                                '& .MuiGauge-valueText': {
                                                    fill: '#5c3a44',
                                                    fontWeight: 700,
                                                },
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={styles.card}>
                                <CardContent>
                                    <Typography variant='subtitle1' sx={styles.sectionSubTitle}>
                                        Report Category Share
                                    </Typography>

                                    <Typography variant='body1' sx={{ mb: 3, color:'#8a6670' }}>
                                        This chart shows the distribution of report requests by category for the current reporting period.
                                    </Typography>

                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <PieChart
                                            colors={['#d88fa3', '#b96d84', '#f3c7d3', '#c08a99']}
                                            series={[
                                                {
                                                    data: [
                                                        { id: 0, value: 14, label: "Spocial Media Followers" },
                                                        { id: 1, value: 10, label: "Song Plays" },
                                                        { id: 2, value: 8, label: "Song Duration" },
                                                        { id: 3, value: 6, label: "Listeners by City" },
                                                    ],
                                                },
                                            ]}
                                            width={280}
                                            height={260}
                                            sx={{
                                                '& .MuiChartsLegend-label': {
                                                    fill: '#5c3a44',
                                                },
                                                '& text': {
                                                    fill: '#5c3a44',
                                                },
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Stack>
                    </CardContent>
                </Card>
                
                {/* Gauge */}
                <Card sx={styles.card}>
                    <CardContent>
                        <Typography variant='h6' sx={styles.sectionTitle}>
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
                                    <Typography variant="subtitle1" sx={styles.sectionSubTitle}>
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
                <Card sx={styles.card}>
                    <CardContent>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                            <Box>
                                <Typography variant='h6' sx={styles.sectionTitle}>
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
                                <Typography variant='h6' sx={styles.sectionTitle}>
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
                <Card sx={styles.card}>
                    <CardContent>
                        <Box>
                            <Typography variant='h6' sx={styles.sectionTitle}>
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
        </Box>
    )
}

export default ReportsPage
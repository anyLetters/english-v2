import color from '../../themeColors.js';

const styles = theme => ({
    card: {
        width: 480,
        height: 280,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cardContent: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    hardOn: {
        color: '#ef5350'
    },
    headline: {
        fontSize: 52,
        fontWeight: 300,
        lineHeight: 1.1
    },
    icon: {
        margin: theme.spacing.unit,
        color: '#616161'
    },
    title: {
        margin: theme.spacing.unit*1.5,
        color: theme.palette.text.secondary
    },
    pos: {
        color: theme.palette.text.secondary,
        marginTop: 3
    },
    actionsButtons: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        borderTop: '1px solid #E0E0E0',
        height: 'auto'
    },
    next: {
        margin: theme.spacing.unit
    },
    checked: {
        color: color.blue[600],
        '& + $bar': {
            backgroundColor: color.blue[300]
        }
    },
    bar: {}
});

export default styles;
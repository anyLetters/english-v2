import color from '../../themeColors.js';

const styles = theme => ({
    formControl: {
        display: 'flex',
        width: '100%'
    },
    formLabel: {
        padding: theme.spacing.unit,
        backgroundColor: '#F5F5F5',
        color: color.grey[600]
    },
    textField: {
        marginTop: theme.spacing.unit*4,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textFieldInput: {
        '&:after': {
            backgroundColor: color.blue[600]
        }
    },
    inputFocusedLabel: {
        color: color.grey[600]
    }
});

export default styles;
import color from '../../themeColors.js';

const styles = theme => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    iconButton: {
        paddingLeft: theme.spacing.unit,
        alignSelf: 'flex-end',
        height: 24,
        width: 24
    },
    inputWord: {
        width: '50%',
        marginRight: theme.spacing.unit
    },
    inputTranslation: {
        marginRight: theme.spacing.unit,
        width: '50%'
    },
    inputInkbar: {
        '&:after': {
            backgroundColor: color.blue[600]
        }
    },
    inputLabelFocused: {
        color: color.grey[700]
    },
    checkbox: {
        color: color.blue[600]
    },
    rootHard: {
        paddingLeft: theme.spacing.unit*2
    }
});

export default styles;
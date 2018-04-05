import color from '../../themeColors.js';

const styles = theme => ({
    default: {
        color: color.grey[500],
        borderRadius: 0,
        fontWeight: 300,
        '&:hover': {
            backgroundColor: color.grey[100]
        }
    },
    active: {
        color: color.blue[600],
        borderRadius: 0,
        fontWeight: 400,
        '&:hover': {
            backgroundColor: color.grey[100]
        }
    }
});

export default styles;
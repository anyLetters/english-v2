import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    formControl: {
        display: 'flex',
        width: '100%',
    },
    formLabel: {
        padding: theme.spacing.unit,
        backgroundColor: '#F5F5F5',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    typography: {
        fontSize: 14,
        color: '#757575'
    }
});

class Stats extends React.Component {

    handleChange = event => {
        this.props.onChange(event.target.value)
    };

    render() {
        const { classes, total, totalHardWords } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Stats</FormLabel>
                <div style={{padding: 16}}>
                    <Typography className={classes.typography}>Total words: {total}</Typography>
                    <Typography className={classes.typography}>Hard: {totalHardWords}</Typography>
                </div>
            </FormControl>
        );
    }
}

Stats.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stats);
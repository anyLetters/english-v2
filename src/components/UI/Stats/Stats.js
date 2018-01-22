import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

const styles = theme => ({
    formControl: {
        // padding: theme.spacing.unit
        display: 'flex',
        width: '100%',
        // backgroundColor: '#EEEEEE'
    },
    formLabel: {
        padding: theme.spacing.unit,
        // borderBottom: '2px solid #EEEEEE',
        // backgroundColor: blue[400],
        backgroundColor: '#F5F5F5',
        // color: 'white'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    inputLabel: {
        margin: theme.spacing.unit*3,
        fontSize: 14,
        // color: blue[400]
        // color: 'white'
    }
});

class Stats extends React.Component {

    handleChange = event => {
        this.props.onChange(event.target.value)
    };

    render() {
        const { classes, total } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Stats</FormLabel>
                <InputLabel className={classes.inputLabel}>Total words: {total}</InputLabel>
            </FormControl>
        );
    }
}

Stats.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stats);
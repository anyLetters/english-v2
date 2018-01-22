import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormLabel, FormControl } from 'material-ui/Form';

const styles = theme => ({
    formControl: {
        display: 'flex',
        width: '100%'
    },
    formLabel: {
        padding: theme.spacing.unit,
        backgroundColor: '#F5F5F5'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

class CharactersFilterField extends React.Component {

    handleChange = event => {
        this.props.onChange(Array.from(new Set(event.target.value.split(', '))).toString());
    };
    
    render() {
        const { classes, value } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Filter</FormLabel>
                <TextField
                    id="with-placeholder"
                    label="Characters"
                    placeholder="a, b, c"
                    margin="normal"
                    value={value}
                    onChange={this.handleChange}
                    className={classes.textField}
                />
            </FormControl>
        );
    }
}

CharactersFilterField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CharactersFilterField);
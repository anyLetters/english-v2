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
        backgroundColor: '#F5F5F5',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class SearchField extends React.Component {

    handleChange = event => {
        this.props.onChange(event.target.value)
    };

    render() {
        const { classes, keyword } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Search</FormLabel>
                <TextField
                    id="search"
                    label="Search field"
                    type="search"
                    placeholder='U can use ! or @. Try it.'
                    defaultValue={keyword}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                />
            </FormControl>
        );
    }
}

SearchField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchField);
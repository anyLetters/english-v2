import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormLabel, FormControl } from 'material-ui/Form';
import color from '../../../themeColors.js';

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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textFieldInput: {
        '&:after': {
            backgroundColor: color.blue[600]
        },
    },
    inputFocusedLabel: {
        color: color.grey[600]
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
                    placeholder='! - exact match, @ - date'
                    defaultValue={keyword}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    InputProps={{classes: {inkbar: classes.textFieldInput}}}
                    InputLabelProps={{
                        FormControlClasses: {focused: classes.inputFocusedLabel}
                    }}
                />
            </FormControl>
        );
    }
}

SearchField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchField);
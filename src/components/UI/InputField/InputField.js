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

class InputField extends React.Component {
    render() {
        const { classes, onChange, placeholder, label, error, value, name } = this.props;

        return (
            <FormControl error={error ? true : false} className={classes.formControl}>
                <FormLabel className={classes.formLabel}>{name}</FormLabel>
                <TextField
                    label={label}
                    placeholder={placeholder}
                    margin="normal"
                    value={value}
                    helperText={error ? error : null}
                    error={error ? true : false}
                    onChange={text => onChange(text)}
                    className={classes.textField}
                    InputProps={{classes: {inkbar: classes.textFieldInput}}}
                    InputLabelProps={{
                        FormControlClasses: {focused: classes.inputFocusedLabel}
                    }}/>
            </FormControl>
        );
    }
}

InputField.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired]),
    placeholder: PropTypes.string
};

export default withStyles(styles)(InputField);
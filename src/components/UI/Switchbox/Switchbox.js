import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import color from '../../../themeColors.js';

const styles = theme => ({
    bar: {},
    checked: {
        color: color.grey[50],
        '& + $bar': {
            backgroundColor: color.grey[700],
            opacity: 1
        }
    },
    formControlLabel: {
        color: '#757575'
    }
});

class Switchbox extends Component {
    render() {
        const { classes, checked, onChange, label } = this.props;
        const SwitchControl = (
            <Switch classes={{checked: classes.checked, bar: classes.bar}} checked={checked} onChange={onChange}/>
        );

        return label
        ? <FormControlLabel
            classes={{label: classes.formControlLabel}}
            control={SwitchControl}
            label={label}/>
        : SwitchControl;
    }
}

Switchbox.propTypes = {
    classes: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
};

export default withStyles(styles)(Switchbox);
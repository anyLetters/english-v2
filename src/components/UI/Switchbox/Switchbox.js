import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    bar: {},
    checked: {
        color: blue[600],
        '& + $bar': {
            backgroundColor: blue[300]
        },
    }
});

class Switchbox extends React.Component {
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes, checked, onChange } = this.props;

        return (
            <FormControlLabel
                control={
                    <Switch
                        classes={{
                            checked: classes.checked,
                            bar: classes.bar,
                        }}
                        checked={checked}
                        onChange={onChange}
                        aria-label="checkedA"/>
                }
                label="Only hard"/>
            
        );
    }
}

Switchbox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Switchbox);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import grey from 'material-ui/colors/grey';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    formControl: {
        width: '100%'
    },
    formLabel: {
        padding: theme.spacing.unit,
        // borderBottom: '2px solid #EEEEEE',
        // backgroundColor: '#42A5F5',
        backgroundColor: '#F5F5F5',
        // backgroundColor: blue[400],
        // color: 'white'
    },
    group: {
        marginLeft: theme.spacing.unit*4,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*2,
    },
    radio: {
        color: grey[400]
        // color: '#EEEEEE'
    }
});

class RadioButtonsGroup extends React.Component {
    state = {
        value: '',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, mode, onChange } = this.props;

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.formLabel}>Mode</FormLabel>
                    <RadioGroup
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                            control={<Radio className={classes.radio} 
                                            checked={mode === 'RANDOM'} value="RANDOM"
                                            onChange={() => onChange('RANDOM')}/>} 
                            label="Random" />
                        <FormControlLabel 
                            control={<Radio className={classes.radio} 
                                            checked={mode === 'SERIAL'} value="SERIAL"
                                            onChange={() => onChange('SERIAL')}/>}
                            label="Serial" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
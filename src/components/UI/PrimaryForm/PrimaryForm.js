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
        marginTop: theme.spacing.unit*4,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class PrimaryFormUI extends React.Component {
    state = {
        value: '',
    };
    
    handleChange = event => {
        if (!event.target.value) this.props.cleanErrors();
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);

        setTimeout(() => {
            if (!this.props.error) {
                this.setState({value: ''});
            }
        }, 1000)
    }

    render() {
        const { classes, error } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl error={error ? true : false} className={classes.formControl}>
                    <FormLabel className={classes.formLabel}>Primary form</FormLabel>
                    <TextField
                        className={classes.textField}
                        placeholder="Add word"
                        helperText={error ? error : null}
                        value={this.state.value}
                        error={error ? true : false}
                        onChange={this.handleChange}
                    />
                </FormControl>
            </form>
        );
    }
}

PrimaryFormUI.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimaryFormUI);
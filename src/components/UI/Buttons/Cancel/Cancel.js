import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function RaisedCancelButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button onClick={props.onClick} className={classes.button}>
                Cancel
            </Button>
        </div>
    );
}

RaisedCancelButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedCancelButton);
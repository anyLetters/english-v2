import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    buttonsHomePage: {
        backgroundColor: blue[600],
        color: 'white',
        margin: theme.spacing.unit,
        height: 180,
        width: 350,
        fontSize: 36,
        letterSpacing: 3,
        '&:hover': {
            background: blue[700]
        }
    },
    input: {
        display: 'none',
    },
});

function raisedButtons(props) {
    const { classes, label } = props;
    return (
        <div>
            <Button raised className={classes.buttonsHomePage}>
                {label}
            </Button>
        </div>
    );
}

raisedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(raisedButtons);
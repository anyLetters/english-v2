import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    progress: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        color: blue[400]
    }
});

function Loading(props) {
    const { classes } = props;
    return (
        <CircularProgress size={80} thickness={2.5} className={classes.progress} />
    );
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
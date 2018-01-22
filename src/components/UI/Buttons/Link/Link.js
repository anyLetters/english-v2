import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        // fontSize: 16,
        // fontWeight: 300,
        padding: 0,
        // color: '#1E88E5',
        '&:hover': {
            backgroundColor: '#EEEEEE'
        }
    }
});

function LinkButton(props) {
    const { classes, children, to } = props;
    return (
        <div>
            <Link to={to} style={{textDecoration: 'none', outline: 'none'}}>
                <Button dense disableFocusRipple={true} disableRipple={true} className={classes.button}>
                    {children}
                </Button>
            </Link>
        </div>
    );
}

LinkButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkButton);
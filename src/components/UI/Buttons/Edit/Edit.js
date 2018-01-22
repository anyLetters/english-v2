import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import EditIcon from 'material-ui-icons/Create';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        padding: 0,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

function IconLabelEditButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button onClick={props.onEdit} className={classes.button}>
                Edit
                <EditIcon className={classes.rightIcon} />
            </Button>
        </div>
    );
}

IconLabelEditButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelEditButton);
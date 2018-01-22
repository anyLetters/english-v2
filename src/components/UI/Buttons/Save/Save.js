import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Save from 'material-ui-icons/Save';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

function IconLabelSaveButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button type='submit' className={classes.button}>
                <Save className={classes.leftIcon} />
                Save
            </Button>
        </div>
    );
}

IconLabelSaveButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelSaveButton);
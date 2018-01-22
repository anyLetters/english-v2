import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import DeleteIcon from 'material-ui-icons/Delete';

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
  
function IconLabelDeleteButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button onClick={props.onClick} className={classes.button}>
                Delete
                <DeleteIcon className={classes.rightIcon} />
            </Button>
        </div>
    );
}
  
const DeleteButton = withStyles(styles)(IconLabelDeleteButton);

class AlertDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.onDelete();
        this.handleClose();
    };

    render() {
        return (
            <div>
                <DeleteButton onClick={this.handleClickOpen} />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The word will be deleted from database.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;
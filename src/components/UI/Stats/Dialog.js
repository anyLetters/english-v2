import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle, DialogContentText } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    button: {
        color: '#757575',
        fontWeight: 300
    },
    dialog: {
        width: '100%'
    }
});

class AlertDialog extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, toExport, lastWord } = this.props;
        return (
            <div style={{paddingTop: 16}}>
                <Button dense className={classes.button} onClick={this.handleClickOpen}>Export {toExport} words</Button>
                <Dialog maxWidth='sm'
                    fullWidth={true}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">Export</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Last word: "{lastWord && lastWord.eng}" <br/>
                            New words: {toExport}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            <a href="http://localhost:5000/api/download" download>Download</a>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AlertDialog);
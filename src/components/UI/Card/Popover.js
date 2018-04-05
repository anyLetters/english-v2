import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        backgroundColor: '#1E88E5'
    },
    typographyPopover: {
        display: 'inline',
        color: theme.palette.text.secondary,
        cursor: 'default'
    },
    typography: {
        color: 'white',
        maxWidth: 420
    },
    popover: {
        pointerEvents: 'none'
    },
    popperClose: {
        pointerEvents: 'none'
    }
});

class MouseOverPopover extends React.Component {
    state = {
        anchorEl: null
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.target });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    handlePopperOpen = () => {
        this.setState({ popperOpen: true });
    };

    handlePopperClose = () => {
        this.setState({ popperOpen: false });
    };

    render() {
        const { classes, words, pos } = this.props;
        const { anchorEl } = this.state;
        const open = !!anchorEl;

        return (
            <span className="wrapper">
                <Typography
                    component='span'
                    className={classes.typographyPopover}
                    onMouseOver={this.handlePopoverOpen}
                    onMouseOut={this.handlePopoverClose}>
                    {`${pos} `}
                </Typography>
                <Popover
                    className={classes.popover}
                    classes={{
                        paper: classes.paper
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    onClose={this.handlePopoverClose}
                    >
                    <Typography className={classes.typography}>{words}</Typography>
                </Popover>
            </span>
        );
    }
}

MouseOverPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  words: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired
};

export default withStyles(styles)(MouseOverPopover);
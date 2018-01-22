import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import HelpOutline from 'material-ui-icons/HelpOutline';
import TurnedInNot from 'material-ui-icons/TurnedInNot';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import Switch from 'material-ui/Switch';

const styles = theme => ({
    button: {
        color: '#616161'
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class AnchorPlayground extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        anchorOriginVertical: 'top',
        anchorOriginHorizontal: 'center',
        transformOriginVertical: 'bottom',
        transformOriginHorizontal: 'center',
        positionTop: 200, // Just so the popover can be spotted more easily
        positionLeft: 400, // Same as above
        anchorReference: 'anchorEl',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleNumberInputChange = key => event => {
        this.setState({
            [key]: parseInt(event.target.value, 10),
        });
    };

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    button = null;

    render() {
        const { classes, translation } = this.props;
        const {
            open,
            anchorEl,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
        } = this.state;

        return (
            <div>
                <Switch
                    
                    className={classes.button}
                    onClick={this.handleClickButton}
                >
                    <HelpOutline ref={node => {
                        this.button = node;
                    }}/>
                </Switch>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorReference={anchorReference}
                    anchorPosition={{ top: positionTop, left: positionLeft }}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: anchorOriginVertical,
                        horizontal: anchorOriginHorizontal,
                    }}
                    transformOrigin={{
                        vertical: transformOriginVertical,
                        horizontal: transformOriginHorizontal,
                    }}
                >
                    <Typography className={classes.typography}>{translation}</Typography>
                </Popover>
            </div>
        );
    }
}

AnchorPlayground.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnchorPlayground);
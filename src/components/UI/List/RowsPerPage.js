import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';

class LongMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null });
        if (event.target.value) this.props.onChange(event);
    };

    render() {
        const { anchorEl } = this.state;
        const { options, rows } = this.props;

        return (
            <div className='rowsPerPage'>
                <Typography type='caption'>Rows: {rows}</Typography>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 46 * 4.5,
                        }
                    }}
                >
                <MenuItem key="placeholder" style={{display: "none"}} />
                {options.map(option => (
                    <MenuItem key={option} value={option} onClick={this.handleClose}>
                        {option}
                    </MenuItem>
                ))}
                </Menu>
            </div>
        );
    }
}

export default LongMenu;
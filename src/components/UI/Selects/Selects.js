import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class SimpleMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const { onChange, children } = this.props;
		const menuItems = children.map((pos, index) => {
			return (
				<MenuItem
					key={index}
					onClick={() => {this.handleClose(); onChange({pos})}}>
					{pos}
				</MenuItem>
			)
		});

		return (
			<div>
				<Button
					aria-owns={anchorEl ? 'simple-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
					disabled={children.length ? false : true}
				>Add field
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItem key="placeholder" style={{display: "none"}} />
					{menuItems}
				</Menu>
			</div>
		);
	}
}

export default SimpleMenu;
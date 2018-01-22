import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import color from '../../themeColors.js';
import { Link } from 'react-router-dom';

const styles = theme => ({
    default: {
        color: color.grey[500],
        borderRadius: 0,
        fontWeight: 300,
        '&:hover': {
            backgroundColor: color.grey[100]
        }
    },
    active: {
        color: color.blue[600],
        borderRadius: 0,
        fontWeight: 400,
        '&:hover': {
            backgroundColor: color.grey[100]
        }
    }
});

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: props.match.url
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path) {
        this.setState({path})
    }

    render() {
        const { classes, match } = this.props;
        const url = match.url.split('/')[1];

        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'white'}}>
                <Link to='/' onClick={() => this.handleClick('/')}
                    style={{textDecoration: 'none', outline: 'none'}}>
                    <Button className={classes.default}>
                        Home
                    </Button>
                </Link>
                <Link to={`/${url}/card`} onClick={() => this.handleClick(`/${url}/card`)}
                    style={{textDecoration: 'none', outline: 'none'}}>
                    <Button className={this.state.path === `/${url}/card` ? classes.active : classes.default}>
                        Card
                    </Button>
                </Link>
                <Link to={`/${url}/list`} onClick={() => this.handleClick(`/${url}/list`)}
                    style={{textDecoration: 'none', outline: 'none'}}>
                    <Button className={this.state.path === `/${url}/list` ? classes.active : classes.default}>
                        List
                    </Button>
                </Link>
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import styles from './theme.js';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: props.match.url
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path) {
        this.setState({path});
    }

    render() {
        const { classes, match } = this.props;
        const url = match.url.split('/')[1];

        return (
            <div className='navigation'>
                <Link to='/' onClick={() => this.handleClick('/')}>
                    <Button className={classes.default}>
                        Home
                    </Button>
                </Link>
                <Link to={`/${url}/card`} onClick={() => this.handleClick(`/${url}/card`)}>
                    <Button className={this.state.path === `/${url}/card` ? classes.active : classes.default}>
                        Card
                    </Button>
                </Link>
                <Link to={`/${url}/list`} onClick={() => this.handleClick(`/${url}/list`)}>
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
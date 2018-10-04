import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Dialog from './Dialog';
import color from '../../../themeColors.js';

const styles = theme => ({
    formControl: {
        display: 'flex',
        width: '100%'
    },
    formLabel: {
        padding: theme.spacing.unit,
        backgroundColor: '#F5F5F5',
        color: color.grey[600]
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    typography: {
        fontSize: 14,
        color: '#757575'
    }
});

class Stats extends Component {

    state = {
        toExport: null,
        lastWord: null
    }

    componentDidMount() {
        this.fetchExportsInfo();
    }

    fetchExportsInfo = () => {
        fetch('/api/export')
        .then(response => response.json())
        .then(object => {
            this.setState({...object});
        });
    }

    componentWillReceiveProps() {
        this.fetchExportsInfo();
    }

    handleChange = event => {
        this.props.onChange(event.target.value);
    };

    render() {
        const { classes, total, totalHardWords } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Stats</FormLabel>
                <div style={{padding: 16}}>
                    <Typography className={classes.typography}>Total words: {total} </Typography>
                    <Typography className={classes.typography}>Hard: {totalHardWords}</Typography>
                    {/* <Typography className={classes.typography}>Export {this.state.export} words</Typography> */}
                    {this.state.toExport ? <Dialog {...this.state}/> : ''}
                </div>
            </FormControl>
        );
    }
}

Stats.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stats);
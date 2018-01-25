import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Popover from './Popover.js';
import LinkButton from '../Buttons/Link/Link.js';
import Speak from 'material-ui-icons/VolumeUp';
import Hard from 'material-ui-icons/PriorityHigh';
import IconButton from 'material-ui/IconButton';
import Switch from 'material-ui/Switch';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    card: {
        width: 480,
        height: 280,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cardContent: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    hardOn: {
        color: '#ef5350'
    },
    headline: {
        fontSize: 52,
        fontWeight: 300,
        lineHeight: 1.1
    },
    icon: {
        margin: theme.spacing.unit,
        color: '#616161'
    },
    title: {
        margin: theme.spacing.unit*1.5,
        // fontWeight: 300,
        color: theme.palette.text.secondary,
    },
    pos: {
        color: theme.palette.text.secondary,
        marginTop: 3
    },
    actionsButtons: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        borderTop: '1px solid #E0E0E0',
        height: 'auto'
    },
    next: {
        margin: theme.spacing.unit
    },
    checked: {
        color: blue[600],
        '& + $bar': {
            backgroundColor: blue[300]
        },
    },
    bar: {}
});

class CardUI extends React.Component {
    constructor() {
        super();

        this.state = {
            toggleLang: false
        };
    }

    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    onToggleHard = id => {
        this.props.toggleHard(id);
    }

    render() {
        const { classes, word, next } = this.props;
    
        const partsOfSpeech = Object.entries(word.translations).map((pos, index) => {
            return <Popover key={index} words={pos[1].join(', ')} pos={pos[0]}/>
        });
    
        let created_at = word.created_at.split('-');
        created_at = `${created_at[2]}.${created_at[1]}.${created_at[0]}`;

        return (
            <div>
                <Card className={classes.card}>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        backgroundColor: '#F5F5F5',
                        borderBottom: '1px solid #E0E0E0'
                    }}>
                        <Typography className={classes.title}>No. {word.id}</Typography>
                        
                        <Typography className={classes.title}>
                            {created_at}
                        </Typography>
                    </div>
                    <CardContent>
                        <div className={classes.cardContent}>
                            <Typography className={classes.headline} type="headline" component="h2">
                                {this.state.toggleLang ? word.rus : word.eng}
                            </Typography>
                            <Typography component='span' className={classes.pos}>{partsOfSpeech}</Typography>
                        </div>
                    </CardContent>
                    <CardActions className={classes.actionsButtons}>
                        <LinkButton to={`/words/${word.id}/show`}>more</LinkButton>
                        <IconButton onClick={() => this.onToggleHard(word.id)}>
                            <Hard className={word.hard ? classes.hardOn : null}/>
                        </IconButton>
                        <Switch checked={this.state.toggleLang}
                                classes={{checked: classes.checked, bar: classes.bar}}
                                onChange={this.handleChange('toggleLang')}/>
                        <IconButton>
                            <Speak className={classes.icon} onClick={() => {
                                window.responsiveVoice.speak(word.eng, 'US English Male')
                            }}/>
                        </IconButton>
                        <Button dense className={classes.next} onClick={next}>NEXT</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

CardUI.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardUI);
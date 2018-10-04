import {
    React,
    Component,
    PropTypes,
    Loading,
    LinkButton,
    Switchbox,
    Button,
    NotFound,
    withStyles,
    MaterialCard,
    CardActions,
    CardContent,
    Typography,
    Popover,
    Speak,
    HardIcon,
    IconButton,
    cardStyles,
    _
} from '../../imports.js';

const InfoBar = props => {
    const { classes, word } = props;
    let created_at = word.created_at.split('-');
    created_at = `${created_at[2]}.${created_at[1]}.${created_at[0]}`;

    return (
        <div className='info-bar'>
            <Typography className={classes.title}>No. {word.id}</Typography>
            <Typography className={classes.title}>{created_at}</Typography>
        </div>
    );
};

const Word = props => {
    const { classes, isRussian, word } = props;

    const anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'left'
    };

    const transformOrigin = {
        vertical: 'top',
        horizontal: 'left'
    };

    const partsOfSpeech = Object.entries(word.translations).map((pos, index) => {
        return (
            <Popover
                key={index}
                words={pos[1].join(', ')}
                pos={pos[0]}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}/>
        );
    });

    return (
        <CardContent>
            <div className={classes.cardContent}>
                <Typography className={classes.headline} type="headline" component="h2">
                    {isRussian
                    ?   word.rus
                    :   <a
                            href={`https://en.oxforddictionaries.com/definition/${word.eng}`}
                            target='_blank'
                            style={{textDecoration: 'none', outline: 'none', color: 'inherit'}}>
                            {word.eng}
                        </a>}
                </Typography>
                <Typography component='span' className={classes.pos}>{partsOfSpeech}</Typography>
            </div>
        </CardContent>
    );
};

const ControlBar = props => {
    const { classes, isRussian, onSwitchLang, word, onToggleHard, nextWord } = props;

    return (
        <CardActions className={classes.actionsButtons}>
            <LinkButton to={`/words/${word.id}`}>more</LinkButton>
            <IconButton onClick={() => onToggleHard(word.id)}>
                <HardIcon className={word.hard ? classes.hardOn : null}/>
            </IconButton>
            <Switchbox checked={isRussian} onChange={onSwitchLang}/>
            <IconButton>
                <Speak className={classes.icon} onClick={() => {
                    window.responsiveVoice.speak(word.eng, 'US English Male');
                }}/>
            </IconButton>
            <Button dense className={classes.next} onClick={nextWord}>NEXT</Button>
        </CardActions>
    );
};

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: _.sample(props.words),
            mode: props.mode,
            offset: 0,
            isSwitchedToRussian: false
        };

        this.getNextWord = this.getNextWord.bind(this);
        this.handleToggleHard = this.handleToggleHard.bind(this);
        this.handleSwitchLang = this.handleSwitchLang.bind(this);
    }

    getNextWord(nextProps) {
        const { mode, offset } = this.state;
        const propWords = nextProps.words ? nextProps.words : this.props.words;

        switch (mode) {
            case 'RANDOM':
                this.setState({ offset: 0, word: _.sample(propWords) });
                break;
            case 'SERIAL':
                this.setState({ offset: offset >= propWords.length - 1 ? 0 : offset + 1, word: propWords[offset] });
                break;
            default:
                return mode;
        }
    }

    handleToggleHard() {
        const { word } = this.state;
        this.setState({ word: {...word, hard: !word.hard } });
        this.props.onToggleHard(word.id);
    }

    handleSwitchLang() {
        this.setState(prevState => {
            return { isSwitchedToRussian: !prevState.isSwitchedToRussian };
        });
    }

    componentWillReceiveProps(nextProps) {
        const { mode } = this.state;
        const { filter } = this.props;

        if (mode !== nextProps.mode) {
            this.setState({ mode: nextProps.mode });
            return;
        }

        if (_.isEmpty(nextProps.words)) {
            this.setState({ word: null });
            return;
        }

        if (filter !== nextProps.filter) {
            this.getNextWord(nextProps);
        }
    }

    render() {
        const { fetching, classes } = this.props;
        const { word, isSwitchedToRussian } = this.state;

        if (fetching) return <Loading/>;
        if (_.isEmpty(word)) return <NotFound/>;

        return (
            <div className='card-container'>
                <MaterialCard className={classes.card}>
                    <InfoBar word={word} classes={classes} />
                    <Word classes={classes} isRussian={isSwitchedToRussian} word={word}/>
                    <ControlBar
                        classes={classes}
                        isRussian={isSwitchedToRussian}
                        word={word}
                        onSwitchLang={this.handleSwitchLang}
                        onToggleHard={this.handleToggleHard}
                        nextWord={this.getNextWord}/>
                </MaterialCard>
            </div>
        );
    }
}

Card.propTypes = {
    words: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    onToggleHard: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

InfoBar.propTypes = {
    classes: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired
};

Word.propTypes = {
    classes: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired,
    isRussian: PropTypes.bool.isRequired
};

ControlBar.propTypes = {
    classes: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired,
    isRussian: PropTypes.bool.isRequired,
    onSwitchLang: PropTypes.func.isRequired,
    onToggleHard: PropTypes.func.isRequired,
    nextWord: PropTypes.func.isRequired
};

export default withStyles(cardStyles)(Card);
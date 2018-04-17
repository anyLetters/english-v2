import {
    React,
    Component,
    PropTypes,
    withStyles,
    InputField,
    ApiWords,
    store,
    PopupForm,
    formStyles
} from '../../imports.js';

class Form extends Component {
    state = { value: '' };

    handleChangeInput = event => {
        if (!event.target.value) this.props.cleanErrors();
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);

        setTimeout(() => {
            if (!this.props.error) this.setState({value: ''});
        }, 1000);
    }

    render() {
        const { classes, error, placeholder, name } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <InputField
                    classes={classes}
                    placeholder={placeholder}
                    name={name}
                    value={this.state.value}
                    onChange={this.handleChangeInput}
                    error={error} />
            </form>
        );
    }
}

class PrimaryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isPopupFormActive: false,
            word: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.cleanErrors = this.cleanErrors.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    handleSubmit(word) {
        if (this.isValid(word)) {
            ApiWords.fetchWord(word).then(word => {
                this.setState({isPopupFormActive: true, word});
            }).catch(error => {
                this.setState({error: error.message});
            });
        }
    }

    isValid(word) {
        this.cleanErrors();

        if (!/^[a-zA-Z\s]+$/.test(word)) {
            this.setState({error: 'Only Latin characters'});
            return false;
        }

        if (store.getState().words.find(w => w.eng.toLowerCase().trim() === word.toLowerCase())) {
            this.setState({error: 'Already added'});
            return false;
        }

        return true;
    }

    cleanErrors() {
        this.setState({error: null});
    }

    handleClose() {
        this.setState({isPopupFormActive: false, word: null});
    }

    render() {
        const { isPopupFormActive, word, error } = this.state;
        const { classes } = this.props;

        return (
            <div className='primary-form'>
                <Form
                    classes={classes}
                    placeholder='Add word'
                    name='Primary form'
                    onSubmit={this.handleSubmit}
                    cleanErrors={this.cleanErrors}
                    error={error}/>
                { isPopupFormActive && <PopupForm
                    word={word}
                    open={isPopupFormActive}
                    onClose={this.handleClose}
                    onSubmit={this.handleSubmit}
                    action='add'/> }
            </div>
        );
    }
}

PrimaryForm.propTypes = {
    classes: PropTypes.object.isRequired
};

Form.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placeholder: PropTypes.string,
    cleanErrors: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string
};

export default withStyles(formStyles)(PrimaryForm);
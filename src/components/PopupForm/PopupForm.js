import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Clear';
import Select from '../UI/Selects/Selects.js';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import styles from './theme.js';

class PopupForm extends Component {
    constructor(props) {
        super(props);

        let translations = Object.assign({}, props.word.translations);

        Object.entries(props.word.translations).forEach(pos => {
            translations[pos[0]] = pos[1].join(', ');
        });

        this.state = {
            eng: props.word.eng,
            rus: props.word.rus,
            hard: props.word.hard || false,
            translations,
            error: null,
            open: props.open
        };

        this.posNames = [
            'noun', 'verb', 'adverb', 'adjective', 'pronoun',
            'particle', 'preposition', 'conjuction', 'interjection'
        ];

        this.validation = this.validation.bind(this);
        this.handleChangeHard = this.handleChangeHard.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this.handleChangeTranslations = this.handleChangeTranslations.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeEng = this.handleChangeEng.bind(this);
        this.handleChangeRus = this.handleChangeRus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeHard() {
        this.setState({hard: !this.state.hard});
    }

    handleDeleteField(pos) {
        this.setState({
            translations: Object.assign(
                {},
                this.state.translations,
                delete this.state.translations[pos]
            )
        });
    }

    handleChangeTranslations(word, pos) {
        this.setState({
            translations: Object.assign(
                {},
                this.state.translations,
                {[pos]: word.target.value}
            )
        });
    }

    handleChangeSelect(word) {
        this.setState({
            translations: Object.assign(
                {},
                this.state.translations,
                {[word.pos]: ''}
            )
        });
    }

    handleChangeEng(word) {
        this.setState({eng: word.target.value});
    }

    handleChangeRus(word) {
        this.setState({rus: word.target.value});
    }


    validation(word) {
        word.preventDefault();
        let error = false;

        this.setState({error: null});

        if (/\d/.test(this.state.rus)) error = 'translation';

        Object.entries(this.state.translations).forEach(pos => {
            if (/\d/.test(pos[1])) error = `${pos[0]}`;
        });

        if (error) {
            this.setState({error});
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        let { action, onAddWord, onClose, onEditWord, updateParentState } = this.props;
        let eng = this.state.eng.trim().toLowerCase();
        let rus = this.state.rus.trim().toLowerCase();
        let translations = Object.assign({}, ...this.state.translations);
        let hard = this.state.hard;

        Object.entries(this.state.translations).forEach(pos => {
            translations[pos[0]] = pos[1].split(',').map(word => word.trim().toLowerCase());
        });

        if (action === 'add') {
            onAddWord({ eng, rus, hard, translations });
            onClose();
        } else if (action === 'edit'){
            const word = {
                id: this.props.word.id,
                eng,
                rus,
                hard,
                translations,
                created_at: this.props.word.created_at
            };
            onEditWord(word);
            onClose();
            updateParentState(word);
        }
    }

    addField() {
        const { translations } = this.state;

        let selectJSX = _.filter(this.posNames, pos => _.isUndefined(translations[pos]));

        return <Select onChange={this.handleChangeSelect}>{selectJSX}</Select>;
    }

    renderForm() {
        const { classes } = this.props;

        return (
            <div>
                <div className='form-dialog'>
                    <FormControl margin='dense' className={classes.inputWord}>
                        <InputLabel>Word</InputLabel>
                        <Input
                            classes={{inkbar: classes.inputInkbar}}
                            type="text"
                            required
                            onChange={this.handleChangeEng}
                            value={this.state.eng}/>
                    </FormControl>
                    <FormControl
                        margin='dense'
                        className={classes.inputTranslation}
                        required
                        error={this.state.error === 'translation'}>
                        <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}}>
                            Translation
                        </InputLabel>
                        <Input
                            classes={{inkbar: classes.inputInkbar}}
                            type="text"
                            required
                            onChange={this.handleChangeRus}
                            value={this.state.rus}/>
                    </FormControl>
                    <FormControlLabel
                        classes={{root: classes.rootHard}}
                        control={
                            <Checkbox
                                className={classes.checkbox}
                                onChange={this.handleChangeHard}
                                checked={this.state.hard}
                                aria-label="checkedA"/>}
                        label="HARD"/>
                </div>
                {this.renderTranslations()}
            </div>
        );
    }

    renderTranslations() {
        const { classes } = this.props;
        const { error, translations } = this.state;
        const translationsLength = Object.keys(translations).length;

        return Object.entries(translations).map((pos, index) => {
            return (
                <div key={index} className={classes.formControl}>
                    <FormControl
                        margin='dense'
                        required
                        fullWidth={true}
                        error={error === pos[0]}>
                        <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}}>
                            {pos[0]}
                        </InputLabel>
                        <Input
                            classes={{inkbar: classes.inputInkbar, formControl: classes.formControl}}
                            multiline={true}
                            type='text'
                            onChange={(e) => this.handleChangeTranslations(e, pos[0])}
                            value={pos[1].toLowerCase()}/>
                    </FormControl>
                    <IconButton aria-label='Delete' disabled={translationsLength <= 1} className={classes.iconButton}>
                        <DeleteIcon onClick={() => this.handleDeleteField(pos[0])} />
                    </IconButton>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth='md'
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Word</DialogTitle>
                    <form onSubmit={this.validation}>
                        <DialogContent>
                            {this.renderForm()}
                        </DialogContent>
                        <DialogActions>
                            {this.addField()}
                            <Button onClick={this.props.onClose} color="primary">
                                Cancel
                            </Button>
                            <Button type='submit' color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

PopupForm.propTypes = {
    word: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    updateParentState: PropTypes.func,
    classes: PropTypes.object,
    action: PropTypes.string.isRequired,
    onAddWord: PropTypes.func.isRequired,
    onEditWord: PropTypes.func.isRequired
};

export default withStyles(styles)(PopupForm);
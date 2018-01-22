import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Clear';
import Select from '../UI/Selects/Selects.js';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import color from '../../themeColors.js';
import {
    FormControl,
    FormControlLabel,
} from 'material-ui/Form';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    iconButton: {
        paddingLeft: theme.spacing.unit,
        alignSelf: 'flex-end',
        height: 24,
        width: 24
    },
    inputField: {
        marginRight: theme.spacing.unit
    },
    inputInkbar: {
        '&:after': {
            backgroundColor: color.blue[700],
        },
    },
    inputLabelFocused: {
        color: color.blue[700],
    },
    checkbox: {
        marginLeft: theme.spacing.unit*4,
        color: color.blue[700]
    }
});

class FormDialog extends Component {
    constructor(props) {
        super(props);

        let translations = Object.assign({}, props.word.translations);

        Object.entries(props.word.translations).forEach(pos => {
            translations[pos[0]] = pos[1].join(', ');
        });

        this.state = {
            eng: props.word.eng,
            rus: props.word.rus,
            hard: props.word.hard !== undefined ? props.word.hard : false,
            translations,
            error: '',
            open: props.open,
            action: props.action
        };

        this.validations = this.validations.bind(this);
        this.handleChangeHard = this.handleChangeHard.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this.handleChangeTranslations = this.handleChangeTranslations.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
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

    handleChangeTranslations(event, pos) {
        this.setState({
            translations: Object.assign(
                {}, 
                this.state.translations,
                {[pos]: event.target.value}
            )
        });
    }

    handleChangeSelect(event) {
        this.setState({
            translations: Object.assign(
                {}, 
                this.state.translations, 
                {[event.pos]: ''}
            )
        });
    }

    handleChangeRus(event) {
        this.setState({rus: event.target.value});
    }

    validations(event) {
        event.preventDefault();
        let error = '';

        this.setState({error: ''});

        if (!this.state.eng) {
            this.setState({error: '"Original word" field is empty'})
            return;
        }

        if (!this.state.rus) {
            this.setState({error: '"Translation" field is empty'})
            return;
        }

        Object.entries(this.state.translations).forEach(pos => {
            if (/\d/.test(pos[1])) error = `"${pos[0]}" contains numbers`;
            if (!pos[1].length) error = `"${pos[0]}" field is empty`;
        });

        error ? this.setState({error}) : this.handleSubmit();
    }

    handleSubmit() {
        let eng = this.state.eng.trim().toLowerCase();
        let rus = this.state.rus.trim().toLowerCase();
        let hard = this.state.hard;
        let translations = Object.assign({}, ...this.state.translations);

        Object.entries(this.state.translations).forEach(pos => {
            translations[pos[0]] = pos[1].split(',').map(e => e.trim().toLowerCase());
        });

        if (this.state.action === 'add') {
            this.props.onAddWord({
                eng,
                rus,
                hard,
                translations
            });
            this.props.onClose();
        } else if (this.state.action === 'edit'){
            const word = {
                id: this.props.word.id,
                eng,
                rus,
                hard,
                translations,
                created_at: this.props.word.created_at
            };
            this.props.onEditWord(word);
            this.props.onClose();
            this.props.updateParentState(word);
        }
    }

    addField() {
        const POSNames = [
            'noun', 'verb', 'adverb', 'adjective', 'pronoun', 
            'particle', 'preposition', 'conjuction', 'interjection'
        ];

        let selectJSX = POSNames.map((pos, index) => {
            if(this.state.translations[pos] === undefined) {
                return pos;
            }
            return null;
        }).filter(n => n);

        return (
            <Select onChange={this.handleChangeSelect}>{selectJSX}</Select>
        )
    }

    renderForm() {
        const { classes } = this.props;
        
        return (
            <div>
                <FormControl margin='dense' className={classes.inputField}>
                    <InputLabel>Word</InputLabel>
                    <Input
                        classes={{inkbar: classes.inputInkbar}}
                        type="text"
                        disabled
                        value={this.state.eng}
                    />
                </FormControl>
                
                <FormControl margin='dense' required>
                    <InputLabel 
                        FormControlClasses={{
                            focused: classes.inputLabelFocused,
                        }}>Translation</InputLabel>
                    <Input
                        classes={{inkbar: classes.inputInkbar}}
                        type="text"
                        required
                        onChange={this.handleChangeRus}
                        value={this.state.rus}
                    />
                </FormControl>
                
                <FormControlLabel
                    control={
                        <Checkbox
                            className={classes.checkbox}
                            onChange={this.handleChangeHard} 
                            checked={this.state.hard}
                            aria-label="checkedA"/>
                    }
                    label="HARD"/>

                {this.renderTranslations()}
            </div>
        )
    }

    renderTranslations() {
        const { classes } = this.props;
        const translationsLength = Object.keys(this.state.translations).length;

        return Object.entries(this.state.translations).map((pos, index) => {
            return (
                <div key={index} className={classes.formControl}>
                    <FormControl margin='dense' required fullWidth={true}>
                        <InputLabel 
                            FormControlClasses={{
                                focused: classes.inputLabelFocused,
                            }}>{pos[0]}</InputLabel>
                        <Input
                            classes={{inkbar: classes.inputInkbar, formControl: classes.formControl}}
                            multiline={true}
                            type="text"
                            onChange={(e) => this.handleChangeTranslations(e, pos[0])}
                            value={pos[1].toLowerCase()}
                        />
                    </FormControl>
                    <IconButton aria-label="Delete" disabled={translationsLength <= 1} className={classes.iconButton}>
                        <DeleteIcon onClick={() => this.handleDeleteField(pos[0])} />
                    </IconButton>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Word</DialogTitle>
                    <form onSubmit={this.validations}>
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

FormDialog.propTypes = {
    word: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    action: PropTypes.string.isRequired,
    onAddWord: PropTypes.func.isRequired,
    onEditWord: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormDialog);
import { connect } from 'react-redux';
import { addWord, editWord } from '../actions';
import FormDialog from '../components/FormDialog/FormDialog.js';

function mapDispatchToProps(dispatch) {
    return {
        onAddWord: word => dispatch(addWord(word)),
        onEditWord: word => dispatch(editWord(word))
    };
}

const FormContainer = connect(null, mapDispatchToProps)(FormDialog);

export default FormContainer;
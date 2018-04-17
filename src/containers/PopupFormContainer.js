import { connect } from 'react-redux';
import { addWord, editWord } from '../actions';
import PopupForm from '../components/PopupForm/PopupForm.js';

function mapDispatchToProps(dispatch) {
    return {
        onAddWord: word => dispatch(addWord(word)),
        onEditWord: word => dispatch(editWord(word))
    };
}

const PopupFormContainer = connect(null, mapDispatchToProps)(PopupForm);

export default PopupFormContainer;
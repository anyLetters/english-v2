import { connect } from 'react-redux';
import { deleteWord } from '../actions';
import Word from '../components/Word/Word.js';

function mapStateToProps(state) {
    return {
        words: state.words,
        fetching: state.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onDeleteWord: id => dispatch(deleteWord(id))
    };
}

const WordContainer = connect(mapStateToProps, mapDispatchToProps)(Word);

export default WordContainer;
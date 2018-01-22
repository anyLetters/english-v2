import { connect } from 'react-redux';
import { deleteWord } from '../actions';
import ShowPage from '../components/ShowPage/ShowPage.js';

function mapStateToProps(state) {
    return {
        data: state.words,
        fetching: state.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onDeleteWord: id => dispatch(deleteWord(id))
    };
}

const ShowPageContainer = connect(mapStateToProps, mapDispatchToProps)(ShowPage);

export default ShowPageContainer;
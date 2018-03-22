import { connect } from 'react-redux';
import Card from '../components/Card/Card.js';
import { toggleHard } from '../actions';
import getVisibleWords from '../selectors/selectedWords';

function mapStateToProps(state) {
    return {
        words: getVisibleWords(state),
        mode: state.mode,
        fetching: state.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleHard: id => dispatch(toggleHard(id))
    };
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);

export default CardContainer;
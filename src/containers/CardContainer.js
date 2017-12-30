import { connect } from 'react-redux';
import Card from '../components/Card/Card.js';
import getVisibleWords from '../selectors/selectedWords';

function mapStateToProps(state) {
    return {
        data: getVisibleWords(state),
        mode: state.mode,
        fetching: state.fetching
    };
}

const CardContainer = connect(mapStateToProps, null)(Card);

export default CardContainer;
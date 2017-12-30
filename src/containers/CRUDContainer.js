import { connect } from 'react-redux';
import { getWords } from '../actions';
import CRUDPage from '../components/CRUDPage/CRUDPage.js';

function mapStateToProps(state) {
    return {
        data: state.words,
        fetching: state.fetching
    };
}

const CRUDPageContainer = connect(mapStateToProps, null)(CRUDPage);

export default CRUDPageContainer;
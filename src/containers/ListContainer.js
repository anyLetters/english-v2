import { connect } from 'react-redux';
import List from '../components/List/List.js';
import getVisibleWords from '../selectors/selectedWords';

function mapStateToProps(state) {
    return {
        data: getVisibleWords(state),
        fetching: state.fetching
    };
}

const ListContainer = connect(mapStateToProps, null)(List);

export default ListContainer;
import { connect } from 'react-redux';
import List from '../components/List/List.js';
import getVisibleWords from '../selectors/selectedWords';
import { toggleHard, changePage, changeRows } from '../actions';

function mapStateToProps(state) {
    return {
        words: getVisibleWords(state),
        fetching: state.fetching,
        page: state.list.page,
        rows: state.list.rows
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleHard: id => dispatch(toggleHard(id)),
        onChangePage: page => dispatch(changePage(page)),
        onChangeRows: rows => dispatch(changeRows(rows))
    };
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;
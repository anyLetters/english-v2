import { connect } from 'react-redux';
import List from '../components/List/List.js';
import getSortedAndFilteredWords from '../selectors/sortedWords';
import { toggleHard, changePage, changeRows, changeSortKey, toggleAlphabeticalOrder } from '../actions';

function mapStateToProps(state) {
    return {
        words: getSortedAndFilteredWords(state),
        fetching: state.fetching,
        page: state.list.page,
        rows: state.list.rows,
        sortKey: state.sort.sortKey,
        sortByABC: state.sort.sortByABC
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleHard: id => dispatch(toggleHard(id)),
        onChangePage: page => dispatch(changePage(page)),
        onChangeRows: rows => dispatch(changeRows(rows)),
        onChangeSortKey: sortKey => dispatch(changeSortKey(sortKey)),
        onToggleAlphabeticalOrder: () => dispatch(toggleAlphabeticalOrder())
    };
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;
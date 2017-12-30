import { connect } from 'react-redux';
import { setKeywordFilter } from '../actions';
import Search from '../components/Search/Search.js';

function mapStateToProps(state) {
    return {
        keyword: state.filter.keyword
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeKeywordFilter: keyword => dispatch(setKeywordFilter(keyword))
    };
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
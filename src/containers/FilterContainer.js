import { connect } from 'react-redux';
import { setCharactersFilter, toggleHardFilter } from '../actions';
import Filter from '../components/Filter/Filter.js';

function mapStateToProps(state) {
    return {
        filter: state.filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeCharactersFilter: characters => dispatch(setCharactersFilter(characters)),
        onToggleHardFilter: () => dispatch(toggleHardFilter())
    };
}

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
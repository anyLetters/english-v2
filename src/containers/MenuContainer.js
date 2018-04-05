import { connect } from 'react-redux';
import { setKeywordFilter, toggleMode } from '../actions';
import Menu from '../components/Menu/Menu.js';

function mapStateToProps(state) {
    return {
        filter: state.filter,
        mode: state.mode,
        total: state.words.length,
        totalHardWords: state.words.filter(word => word.hard).length
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeKeywordFilter: keyword => dispatch(setKeywordFilter(keyword)),
        onToggleMode: mode => dispatch(toggleMode(mode))
    };
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
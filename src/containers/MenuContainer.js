import { connect } from 'react-redux';
import { setKeywordFilter, toggleMode } from '../actions';
import Menu from '../components/Menu/Menu.js';

function mapStateToProps(state) {
    return {
        filter: state.filter,
        mode: state.mode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeKeywordFilter: Keyword => dispatch(setKeywordFilter(Keyword)),
        onToggleMode: mode => dispatch(toggleMode(mode))
    };
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
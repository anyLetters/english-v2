import { connect } from 'react-redux';
import App from '../App.js';
import { getWords } from '../actions';

function mapStateToProps(state) {
	return {
		fetching: state.fetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchWords: () => dispatch(getWords())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
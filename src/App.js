import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WordsPage from './components/WordsPage/WordsPage.js';
import HomePage from './components/HomePage/HomePage.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loading from './components/UI/Loading/Loading.js';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetching: props.fetching
		};

		this.renderApp = this.renderApp.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
	}

	componentWillMount() {
		this.props.fetchWords();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({fetching: nextProps.fetching});
	}

	renderApp() {
		return (
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/words' component={WordsPage} />
				<Route path='/phrases' component={() => (<div>123</div>)} />
			</Switch>
		);
	}

	renderLoading() {
		return <Loading />;
	}

	render() {

		return (
			<Router>
				<main className='App'>
					{!this.state.fetching ? this.renderApp() : this.renderLoading()}
				</main>
			</Router>
		);
	}
}

App.propTypes = {
	fetching: PropTypes.bool.isRequired,
	fetchWords: PropTypes.func.isRequired
};
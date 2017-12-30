import React, { Component } from 'react';
import { connect } from "react-redux";
import WordsPage from './components/WordsPage/WordsPage.js';
import HomePage from './components/HomePage/HomePage.js';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetching: props.fetching
		}

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
			<div>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/words' component={WordsPage} />
					<Route path='/phrases' component={() => (<div>123</div>)} />
				</Switch>
					
		 	</div>
		)
	}

	renderLoading() {
		return <div>Loading...</div>
	}

	render() {
		return (
			<Router>
				<main>
					{!this.state.fetching ? this.renderApp() : this.renderLoading()}
				</main>
		 	</Router>
		)
	}
}

export default App;
  
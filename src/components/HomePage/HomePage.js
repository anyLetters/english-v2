import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../UI/Buttons/Custom/Custom.js';

export default class HomePage extends Component {
    render() {
        return (
            <div className='homepage'>
                <Link to='/words/card'>
                    <CustomButton label='words' />
                </Link>
                <Link to='/phrases/card'>
                    <CustomButton label='phrases' />
                </Link>
            </div>
        );
    }
}
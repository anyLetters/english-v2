import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../UI/Buttons/Custom/Custom.js';

export default class HomePage extends Component {
    render() {
        return (
            <div className='homePage'>
                <Link to='/words/card' style={{textDecoration: 'none'}}>
                    <CustomButton label='words' />
                </Link>
                <Link to='/phrases/card' style={{textDecoration: 'none'}}>
                    <CustomButton label='phrases' />
                </Link>
            </div>
        )
    }
}
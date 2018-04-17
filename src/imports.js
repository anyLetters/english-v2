// react things
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components/UI
import cardStyles from './components/Card/theme.js';
import formStyles from './components/PrimaryForm/theme.js';
import NotFound from './components/NotFound/NotFound.js';
import Popover from './components/UI/Popover/Popover.js';
import Switchbox from './components/UI/Switchbox/Switchbox.js';
import Loading from './components/UI/Loading/Loading.js';
import PopupForm from './containers/PopupFormContainer.js';
import LinkButton from './components/UI/Buttons/Link/Link.js';
import InputField from './components/UI/InputField/InputField.js';

// material-ui things
import MaterialCard, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Speak from 'material-ui-icons/VolumeUp';
import HardIcon from 'material-ui-icons/Flag';
import IconButton from 'material-ui/IconButton';
import Switch from 'material-ui/Switch';

// libs/other things
import _ from 'lodash';
import ApiWords from './api/words.js';
import store from './store';

export {
    React,
    Component,
    PropTypes,
    Loading,
    PopupForm,
    withStyles,
    MaterialCard,
    CardActions,
    CardContent,
    Button,
    FormControlLabel,
    store,
    formStyles,
    TextField,
    Typography,
    Popover,
    ApiWords,
    FormLabel,
    FormControl,
    LinkButton,
    InputField,
    Speak,
    HardIcon,
    IconButton,
    Switch,
    NotFound,
    cardStyles,
    Switchbox,
    _
};
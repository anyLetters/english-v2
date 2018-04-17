import {
    React,
    Component,
    PropTypes,
    Switchbox,
    InputField
} from '../../imports.js';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: props.filter.characters
        };

        this.handleSwitchboxChange = this.handleSwitchboxChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleSwitchboxChange() {
        this.props.onToggleHardFilter();
    }

    handleChangeInput(text) {
        let parsedText = Array.from(new Set(text.target.value.split(', '))).toString();
        let characters = parsedText.replace(/[^A-Za-z\s!?]/g,'').split('');
        characters = Array.from(new Set(characters)).toString();

        if (this.state.characters !== characters.split(',').join(', ')) {
            this.props.onChangeCharactersFilter(Array.from(characters.split(',')));
        }

        this.setState({characters: characters.split(',').join(', ')});
    }

    render() {
        return (
            <div className='filter menu__element'>
                <InputField
                    label='Characters'
                    name='Filter'
                    placeholder='a, b, c'
                    value={this.state.characters}
                    onChange={this.handleChangeInput} />
                <Switchbox
                    checked={this.props.filter.hard}
                    onChange={this.handleSwitchboxChange}
                    label='Only hard' />
            </div>
        );
    }
}

Filter.propTypes = {
    filter: PropTypes.object.isRequired,
    onChangeCharactersFilter: PropTypes.func.isRequired,
    onToggleHardFilter: PropTypes.func.isRequired
};

export default Filter;
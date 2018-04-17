import {
    React,
    Component,
    PropTypes,
    InputField
} from '../../imports.js';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: props.keyword
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(keyword) {
        keyword = keyword.target.value;
        this.setState({keyword});
        this.props.onChangeKeywordFilter({keyword});
    }

    render() {
        return (
            <div className='search menu__element'>
                <InputField
                    label='Search field'
                    name='Search'
                    placeholder='! - exact match, @ - date'
                    value={this.state.keyword}
                    onChange={this.handleChange} />
            </div>
        );
    }
}

Search.propTypes = {
    keyword: PropTypes.string,
    onChangeKeywordFilter: PropTypes.func.isRequired
};
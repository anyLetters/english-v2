import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            offset: 0,
            pageCount: Math.ceil(props.data.length / 20)
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.paginateData = this.paginateData.bind(this);
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * 20);
        this.setState({offset}, () => this.paginateData());
    }

    paginateData(nextProps) {
        if (nextProps) {
            const data = nextProps.data.slice(0, 20);
            this.setState({data, offset: 0, pageCount: Math.ceil(nextProps.data.length / 20)});
        } else {
            const data = this.props.data.slice(this.state.offset, this.state.offset + 20);
            this.setState({data, pageCount: Math.ceil(this.props.data.length / 20)});
        }
    }

    componentDidMount() {
        this.paginateData()
    }

    componentWillReceiveProps(nextProps) {
        this.paginateData(nextProps);
    }

    render() {
        if (!this.props.fetching) {
            return (
                <div>
                    <div style={{position: 'absolute'}}>
                        <ReactPaginate  
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            pageCount={this.state.pageCount}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={this.handlePageClick} />
                    </div>
                    {this.state.data.map((word) => {
                        return (
                            <div key={word.id}>
                                <div style={{fontFamily: 'Verdana', fontSize: '20px', textAlign: 'center'}}>
                                    <span>{word.eng} {word.rus}</span>
                                    <Link to={`/words/${word.id}/show`} target="_blank"> meanings</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <div>Loading...</div>;
        }
    }
}
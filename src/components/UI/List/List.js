import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Popover from './Popover.js';
import Paper from 'material-ui/Paper';
import Pagination from '../Pagination/Pagination.js';
import { Link } from 'react-router-dom';
import RowsPerPage from './RowsPerPage.js';
import _ from 'lodash';

const styles = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        margin: '0 auto'
    },
    table: {
        width: '100%',
    },
    tableHeadRow: {
        height: 20,
        fontWeight: 300,
        fontSize: 13,
        backgroundColor: '#F5F5F5'
    },
    tableHeadCellId: {
        padding: 0,
        width: '10%',
        textAlign: 'center'
    },
    tableHeadCellEng: {
        padding: 0,
        width: '20%',
        textAlign: 'center'
    },
    tableHeadCellRus: {
        padding: 0,
        width: '20%',
        textAlign: 'center'
    },
    tableHeadCellPos: {
        padding: 0,
        width: '50%',
        textAlign: 'center'
    },
    tableBody: {
        height: `${window.innerHeight - 158 - ((theme.spacing.unit * 18) - 3)}px`
    },
    tableRow: {
        height: 32,
        width: '100%',
        fontSize: 16,
        fontWeight: 300,
        padding: 0,
        margin: 0
    },
    tableCellId: {
        padding: 0,
        width: `10%`,
        backgroundColor: '#FAFAFA',
        textAlign: 'center',
        borderRight: '2px solid #F5F5F5',
        cursor: 'pointer'
    },
    tableCellIdHard: {
        backgroundColor: '#FAFAFA',
        borderRight: '2px solid #F5F5F5',
        color: '#ef5350',
        fontWeight: '400',
        textAlign: 'center',
        padding: 0,
        width: `10%`,
        cursor: 'pointer'
    },
    tableCellEng: {
        padding: 0,
        width: `20%`,
        textAlign: 'center',
        borderRight: '2px solid #F5F5F5'
    },
    tableCellRus: {
        padding: 0,
        width: `20%`,
        textAlign: 'center',
    },
    tableCellPos: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        width: `50%`,
        borderLeft: '2px solid #F5F5F5'
    },
    tableFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderTop: '1px solid #EEEEEE'
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class _Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: props.words
        };
    }

    handleChangePage = page => {
        this.props.onPageChange(page);
    };

    handleChangeRowsPerPage = event => {
        this.props.onRowsChange(event.target.value);
    };

    render() {
        const { classes, words, page, totalPages, rows, onToggleHard } = this.props;
        const emptyRows = rows - Math.min(rows, ((totalPages - page) * rows));

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeadRow}>
                            <TableCell className={classes.tableHeadCellId} numeric>No.</TableCell>
                            <TableCell className={classes.tableHeadCellEng}>Word</TableCell>
                            <TableCell className={classes.tableHeadCellRus}>Translation</TableCell>
                            <TableCell className={classes.tableHeadCellPos}>Meanings</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody className={classes.tableBody}>
                            {words.map(word => {
                                return (
                                    <TableRow key={word.id} className={classes.tableRow}>
                                        <TableCell className={word.hard ? classes.tableCellIdHard : classes.tableCellId}>
                                            <a onClick={() => onToggleHard(word.id)}>
                                                {word.id}
                                            </a>
                                        </TableCell>
                                            <TableCell className={classes.tableCellEng}>
                                                <a  target='_blank'
                                                    href={`https://en.oxforddictionaries.com/definition/${word.eng}`}
                                                    style={{
                                                        outline: 'none',
                                                        textDecoration: 'none', 
                                                        color: 'rgba(0, 0, 0, 0.87)'
                                                    }}>
                                                    {word.eng}
                                                </a>
                                            </TableCell>
                                            <TableCell className={classes.tableCellRus}>
                                                <Link to={`/words/${word.id}/word`} style={{
                                                    outline: 'none',
                                                    textDecoration: 'none', 
                                                    color: 'rgba(0, 0, 0, 0.87)'
                                                }}>
                                                    {word.rus}
                                                </Link>
                                            </TableCell>
                                        <TableCell className={classes.tableCellPos}>
                                            <div className='pos-container'>
                                                {Object.entries(word.translations).map((pos, index) => {
                                                    return (
                                                        <div key={index} className='pos-container__wrapper'>
                                                            <div className='pos-container__item'>
                                                                <Popover 
                                                                    words={pos[1].join(', ')} 
                                                                    pos={pos[0]}/>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: ((window.innerHeight - 158 - 125) / 16) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    <TableFooter>
                        <TableRow className={classes.tableFooter}>
                            <TableCell className='tableCellPagination'>
                                <div className='list-bottom'>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={page + 1}
                                        onChange={this.handleChangePage}/>
                                    <RowsPerPage
                                        options={[10, 15, 20, 25, 30, 40, 50]}
                                        rows={rows}
                                        onChange={this.handleChangeRowsPerPage}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

_Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(_Table);
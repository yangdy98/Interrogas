import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import debug from 'sabio-debug';
import Table from './Table.jsx';
import PropTypes from 'prop-types';

const _logger = debug.extend('Candidates');
/* Candidate column render */

// main components

function CandidatesTable(props) {
    const CandidateColumn = ({ row }) => {
        return (
            <>
                <img
                    src={row.original.avatarUrl}
                    alt={row.original.name}
                    title={row.original.name}
                    width={50}
                    height={48}
                    className="rounded me-3"
                />
                <p className="m-0 d-inline-block align-middle font-16">
                    <Link to="/apps/ecommerce/details" className="text-body">
                        {row.original.allName}
                    </Link>
                    <br />
                </p>
            </>
        );
    };

    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={classNames('badge', {
                        'bg-success': row.original.status === 'Active' ? true : false,
                        'bg-danger': row.original.status === 'Inactive' ? true : false,
                        'bg-warning': row.original.status === 'Flagged' ? true : false,
                        'bg-dark': row.original.status === 'Removed' ? true : false,
                        'bg-info': row.original.status === 'Pending' ? true : false,
                    })}>
                    {row.original.status === 'Active'
                        ? 'Active'
                        : row.original.status === 'Inactive'
                        ? 'Inactive'
                        : row.original.status === 'Flagged'
                        ? 'Flagged'
                        : row.original.status === 'Removed'
                        ? 'Removed'
                        : 'Pending'}
                </span>
            </>
        );
    };

    const BoolColumn = ({ row }) => {
        return row.original.isElected ? 'Elected' : 'Not Elected';
    };

    /* action column render */

    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link
                    to={{
                        pathname: `update`,
                        search: `${row.original.id}`,
                        state: `${row.original.id}`,
                        key: `${row.original.id}`,
                    }}
                    className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {''}
                    <i className="mdi mdi-delete" onClick={() => props.onDeleteRequested(row)}></i>
                </Link>
            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            sort: true,
            Cell: CandidateColumn,
        },
        {
            Header: 'Surnames',
            accessor: 'surnames',
            sort: true,
        },
        {
            Header: 'Gender ',
            accessor: 'genderType',
            sort: true,
        },
        {
            Header: 'Age',
            accessor: 'age',
            sort: true,
        },
        {
            Header: 'Party',
            accessor: 'party',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: true,
            Cell: StatusColumn,
        },
        {
            Header: 'Election',
            accessor: 'electionType',

            sort: true,
        },
        {
            Header: 'IsElected?',
            accessor: 'isElected',
            Cell: BoolColumn,
            sort: true,
        },

        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    // get pagelist to display
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',

            value: props.candidates.length,
        },
    ];

    _logger(props);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={props.candidates}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                isPagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                theadClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

CandidatesTable.propTypes = {
    onDeleteRequested: PropTypes.func.isRequired,
    candidates:
        PropTypes.array ||
        PropTypes.arrayOf(
            PropTypes.shape({
                avatarUrl: PropTypes.string,
                name: PropTypes.string,
                allName: PropTypes.string,
                status: PropTypes.string,
                id: PropTypes.number,
            }).isRequired
        ),
    row: PropTypes.shape({
        allCells: PropTypes.shape([]),
        cells: PropTypes.shape([]),
        depth: PropTypes.number,
        getRowProps: PropTypes.func,
        getToggleRowSelectedProps: PropTypes.func,
        id: PropTypes.string,
        index: PropTypes.number,
        isSelected: PropTypes.bool,
        isSomeSelected: PropTypes.bool,
        original: PropTypes.shape({
            avatarUrl: PropTypes.string,
            name: PropTypes.string,
            allName: PropTypes.string,
            status: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
        originalSubRows: PropTypes.shape([]),
        subRows: PropTypes.shape([]),
        toggleRowSelected: PropTypes.func,
        values: PropTypes.shape({}),
    }),
};

export default CandidatesTable;

// @flow
import React, { useRef, useEffect, forwardRef } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import Pagination from './Pagination.jsx';
import PropTypes from 'prop-types';

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

const Table = (props) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const isPagination = props['isPagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        isPagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.hasExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.hasExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = isPagination ? dataTable.page : dataTable.rows;

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        key={index}
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sortingDesc: column.isSortedDesc === true,
                                            sortingAsc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, index) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr key={index} {...row.getRowProps()}>
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <td key={index} {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isPagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

GlobalFilter.propTypes = {
    preGlobalFilteredRows: PropTypes.array || PropTypes.arrayOf({}),
    globalFilter: PropTypes.string,
    setGlobalFilter: PropTypes.func,
    searchBoxClass: PropTypes.string,
};
IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.bool || PropTypes.bool,
};

Table.propTypes = {
    props: PropTypes.shape({}),
    isSearchable: PropTypes.bool.isRequired,
    isSortable: PropTypes.bool.isRequired,
    isPagination: PropTypes.bool.isRequired,
    isSelectable: PropTypes.bool.isRequired,
    isExpandable: PropTypes.bool,
    pageSize: PropTypes.number,
    columns:
        PropTypes.array ||
        PropTypes.arrayOf({
            Header: PropTypes.string,
            accessor: PropTypes.string,
            sort: PropTypes.bool,
            Cell: PropTypes.func,
        }),
    data: PropTypes.array || PropTypes.shape([]),
    getToggleAllPageRowsSelectedProps: PropTypes.func,
    getToggleAllPageRowsExpandedProps: PropTypes.func,
    getToggleAllRowsExpandedProps: PropTypes.func,
    isAllRowsExpanded: PropTypes.bool,
    sizePerPageList:
        PropTypes.array ||
        PropTypes.arrayOf({
            text: PropTypes.string,
            value: PropTypes.number,
        }),
    tableClass: PropTypes.string,
    theadClass: PropTypes.string,
    searchBoxClass: PropTypes.string,
    row:
        PropTypes.array ||
        PropTypes.shape({
            hasExpand: PropTypes.bool,
            isExpanded: PropTypes.bool,
            getToggleRowExpandedProps: PropTypes.func,
            depth: PropTypes.number,
            getToggleRowSelectedProps: PropTypes.func,
        }).isRequired,
};

export default Table;

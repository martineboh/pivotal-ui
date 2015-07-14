const classnames = require('classnames');
const React = require('react');
const sortBy = require('lodash.sortby');

const types = React.PropTypes;

/**
 * @component TableHeader
 * @description Wrapper for a th
 *
 * @property `sortable` {boolean} (defaults to false) indicates whether the table can be sorted by this column;
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#table_sortable_react)
 */
export const TableHeader = React.createClass({
  propTypes: {
    onClick: types.func,
    onSortableTableHeaderClick: types.func
  },

  handleClick(...args) {
    var {sortable, onClick, onSortableTableHeaderClick} = this.props;
    if (sortable) onSortableTableHeaderClick(...args);
    if (onClick) onClick(...args);
  },

  render() {
    const {sortable, className, ...props} = this.props;
    const classes = classnames({'sortable': sortable}, className);

    return <th {...props} className={classes} onClick={this.handleClick}/>;
  }
});

/**
 * @component TableCell
 * @description Wrapper for a td
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#table_sortable_react)
 */
export const TableCell = React.createClass({
  render() {
    return <td {...this.props}/>;
  }
});

/**
 * @component TableRow
 * @description Wrapper for a tr
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#table_sortable_react)
 */
export const TableRow = React.createClass({
  render() {
    return <tr {...this.props}/>;
  }
});

/**
 * @component SortableTable
 * @description A table that can be sorted by column
 *
 * @property `headers` {Array<Object>} A list of `TableHeader` components
 *
 * @example ```js
 * var {SortableTable, TableHeader, TableRow, TableCell} = require('pui-react-sortable-table');
 * var MyComponent = React.createClass({
 *   render() {
 *     var headers = [
 *       <TableHeader sortable={true}>c1</TableHeader>,
 *       <TableHeader sortable={true}>c2</TableHeader>,
 *      ];
 *     var data = [
 *       {c1: 'yes', c2: 'foo'},
 *       {c1: 'no', c2: 'bar'}
 *     ];
 *     return <SortableTable headers={headers}>
 *       {sortTableData.map(function(datum, key) {
 *         return (
 *           <TableRow key={key}>
 *             <TableCell>{datum.c1}</TableCell>
 *             <TableCell>{datum.c2}</TableCell>
 *           </TableRow>
 *         );
 *       })}
 *     </SortableTable>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#table_sortable_react)
 */
export const SortableTable = React.createClass({
  propTypes: {
    headers: types.arrayOf(types.element)
  },

  getInitialState() {
    return {sortColumn: 0, sortAscending: true};
  },

  setSortedColumn(sortColumn, sortAscending) {
    this.setState({sortColumn, sortAscending});
  },

  headerClassesWithSortDirection({headerClassName, isSortColumn}) {
    return classnames(headerClassName, {
      'sorted-asc': isSortColumn && this.state.sortAscending,
      'sorted-desc': isSortColumn && !this.state.sortAscending
    });
  },

  sortedRows() {
    const {sortColumn, sortAscending} = this.state;
    const sortedRows = sortBy(this.props.children, (row) => {
      const cellForSorting = row.props.children[sortColumn];
      return cellForSorting.props.children;
    });
    return sortAscending ? sortedRows : sortedRows.reverse();
  },

  renderHeaders() {
    var {headers} = this.props;
    const {sortColumn, sortAscending} = this.state;
    return headers.map((header, index) => {
      const isSortColumn = (sortColumn === index);
      return React.cloneElement(header, {
        key: index,
        className: this.headerClassesWithSortDirection(
          {
            headerClassName: header.props.className,
            isSortColumn
          }
        ),
        onSortableTableHeaderClick: () => this.setSortedColumn(index, isSortColumn ? !sortAscending : true)
      });
    });
  },

  render() {
    let {className, style, id} = this.props;
    let rows = this.sortedRows();

    return (
      <table className={classnames('table', 'table-sortable', className)} id={id} style={style} >
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

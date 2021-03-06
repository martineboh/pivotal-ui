# Tables

## Description

## Props

Table

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
columns     | yes | Array     | | Metadata about columns
CustomRow   | no  | Component | | The component to use when rendering table rows
data        | yes | Array     | | The data to display in the table
defaultSort | no  | String    | | The name of the column to use for sorting before user input

Items in 'Column'

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
attribute   | yes | String    |       | The key to use in the data prop to get data for that column
CustomCell  | no  | Component |       | Component to use when rendering cells, defaults to TableCell
displayName | no  | String    |       | The text in the TableHeader for that column
headerProps | no  | Object    |       | React props that will be passed through to that column
sortable    | no  | Boolean   | false | Is this column sortable? Defaults to false
sortBy      | no  | Function  |       | Function to transform data before sorting
cellClass   | no  | String    |       | Class to apply to all cells in a column

# HTML Tables

## Description

The `Table` component is a robust component that offers a styled table with fully
functioning sort. If the rows change, the content on the page will update.

## Basic Usage

Import the subcomponents:

```
import {Table, TableRow, TableCell} from 'pui-react-table';
```

```jsx
::title=Basic Example
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false
  },
  {
    attribute: 'instances',
    sortable: true
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<div>
    <Table columns={columns} data={data} defaultSort='instances'/>
</div>
```

The `TableRow` component is provided for users who wish to customize their rows
with the `CustomRow` prop to `Table`. If a custom row is provided, the table will use that
component to render each row, giving it a `children` prop representing the cells for that row and `index`
representing the (zero-indexed) row number.

Note that sorting occurs on the actual data.
Changing the presentation of the data does not affect the sort behavior.

```jsx
::title=Custom Row Example

const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false
  },
  {
    attribute: 'instances',
    sortable: true
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

class CustomRow extends React.Component {
  render() {
    return (
      <TableRow className={"row-number"+this.props.index}>
        {this.props.children}
      </TableRow>
    );
  }
}

<Table columns={columns} data={data} CustomRow={CustomRow}/>
```

The `TableCell` component is provided for users who wish to customize their cells
with the `CustomCell` attribute on the `columns` prop. If a custom cell is provided, the table will use that
component to render each cell, giving it a `value` prop representing the attribute from the datum for that row and `index`
representing the (zero-indexed) row number. For more advanced use cases, the `rowDatum` prop is also passed into the custom cell.

Note that sorting occurs on the actual data.
Changing the presentation of the data does not affect the sort behavior.

```jsx
::title=Custom Cell Example
class CustomCell extends React.Component {
  render() {
    return (
      <TableCell>
        {this.props.index}: {this.props.value}, Bar value {this.props.rowDatum.bar}
      </TableCell>
    );
  }
}

const customCellColumns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    CustomCell: CustomCell
  },
  {
    attribute: 'bar',
    sortable: true
  },
  {
    attribute: 'instances',
    sortable: true
  }
];

const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<Table columns={customCellColumns} data={data}/>
```



# Flex Tables

## Description

The `FlexTable` component is similar to the `Table` component except it will build the underlying table
as a flex grid instead of a traditional html table.


## Basic usage

Import the subcomponents:

```
import {FlexTable, FlexTableRow, FlexTableCell} from 'pui-react-table';
```

```jsx
::title=Basic FlexTable Example
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    cellClass: 'col-2',
    width: '100px'
  },
  {
    attribute: 'instances',
    sortable: true,
    cellClass: 'col-8'
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false,
    cellClass: 'col-8'
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={columns} data={data} defaultSort='instances'/>
```

The `FlexTableRow` component is provided for users who wish to customize their rows
with the `CustomRow` prop to `FlexTable`.


```jsx
::title=Custom Row Example
class CustomRow extends React.Component {
  render() {
    return (
      <FlexTableRow className={"tr-hover"}>
        {this.props.children}
      </FlexTableRow>
    );
  }
}
const columns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    cellClass: 'col-2',
    width: '100px'
  },
  {
    attribute: 'instances',
    sortable: true,
    cellClass: 'col-8'
  },
  {
    attribute: 'bar',
    displayName: 'Bar',
    sortable: true,
    headerProps: {
      className: 'bar-header',
      id: 'barId'
    },
    sortBy: function(value) { return -value; }
  },
  {
    attribute: 'unsortable',
    sortable: false,
    cellClass: 'col-8'
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={columns} data={data} CustomRow={CustomRow}/>
```

The `FlexTableCell` component is provided for users who wish to customize their cells
with the `CustomCell` attribute on the `columns` prop.

```jsx
::title=Custom Cell Example
class CustomCell extends React.Component {
  render() {
    return (
      <FlexTableCell>
        {this.props.index}: {this.props.value}, Bar value {this.props.rowDatum.bar}
      </FlexTableCell>
    );
  }
}

const customCellColumns = [
  {
    attribute: 'title',
    displayName: 'Title',
    sortable: false,
    CustomCell: CustomCell
  },
  {
    attribute: 'bar',
    sortable: true
  },
  {
    attribute: 'instances',
    sortable: true
  }
];
const data = [
  {
    instances: '1',
    bar: 11,
    title: 'foo',
    unsortable: '14'
  },
  {
    instances: '3',
    bar: 7,
    title: 'sup',
    unsortable: '22'
  },
  {
    title: 'yee',
    instances: '2',
    bar: 8,
    unsortable: '1'
  }
];

<FlexTable columns={customCellColumns} data={data}/>
```

## Props

FlexTable

Property           | Required | Type      | Default | Description
-------------------|----------|-----------|---------|------------
columns            | yes      | Array     |         | Metadata about columns
CustomRow          | no       | Component |         | The component to use when rendering table rows
data               | yes      | Array     |         | The data to display in the table
defaultSort        | no       | String    |         | The name of the column to use for sorting before user input
headerRowClassName | no       | String    |         | Class name to apply to the header row
bodyRowClassName   | no       | String    |         | Class name to apply to the body rows
hideHeaderRow      | no       | Boolean   | false   | Render the header row? Defaults to false
rowProps           | no       | Object    |         | Props passed to row components

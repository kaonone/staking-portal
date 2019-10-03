import * as React from 'react';
import * as cn from 'classnames';
import { StylesProps, provideStyles } from './Table.style';

type MakeFnComponentProps<P = {}, C = any> = P & { children?: C };

interface ISharedProps { className?: string; onClick?(): void; }

interface ICellProps {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
}

interface ITableProps {
  separated?: boolean;
  onClick?(): void;
}
class Table extends React.Component<ISharedProps & ITableProps & StylesProps> {

  public render() {
    const { classes, children, className, separated } = this.props;
    return (
      <table
        className={cn(
          classes.root,
          className,
          {
            [classes.separated]: separated,
          })}
      >
        {children}
      </table>
    );
  }
}

const TableComponent = provideStyles(Table);

function TableHead(props: MakeFnComponentProps<ISharedProps>) {
  return <thead {...props} />;
}

function TableBody(props: MakeFnComponentProps<ISharedProps>) {
  return <tbody {...props} />;
}

function TableRow(props: MakeFnComponentProps<ISharedProps>) {
  return <tr {...props} />;
}

const TableCell = React.memo((props: MakeFnComponentProps<ISharedProps & ICellProps>) => {
  return <td {...props} />;
});
TableCell.displayName = 'TableCell';

export { TableComponent as Table, TableHead, TableBody, TableRow, TableCell };

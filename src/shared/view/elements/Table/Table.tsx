import React from 'react';
import cn from 'classnames';
import { useStyles, useTableRowStyles } from './Table.style';

interface ISharedProps {
  className?: string;
  children?: React.ReactNode;
  onClick?(): void;
}

interface ICellProps {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
}

interface ITableProps {
  separated?: boolean;
  onClick?(): void;
}

function Table(props: ISharedProps & ITableProps) {
  const classes = useStyles();
  const { children, className, separated } = props;
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

function TableHead(props: ISharedProps) {
  return <thead {...props} />;
}

function TableBody(props: ISharedProps) {
  return <tbody {...props} />;
}

function TableRow(props: ISharedProps) {
  const classes = useTableRowStyles();
  return <tr {...props} className={cn(props.className, { [classes.clickable]: !!props.onClick })} />;
}

const TableCell = React.memo((props: ISharedProps & ICellProps) => {
  return <td {...props} />;
});
TableCell.displayName = 'TableCell';

export { Table, TableHead, TableBody, TableRow, TableCell };

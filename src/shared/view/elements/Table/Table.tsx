import React from 'react';
import * as R from 'ramda';
import cn from 'classnames';
import { useStyles } from './Table.style';
import { attachStaticFields } from 'shared/helpers';

interface ISharedProps {
  className?: string;
  children?: React.ReactNode;
  onClick?(): void;
}

interface IColumnProps {
  className?: string;
  children?: React.ReactNode;
}

interface IHeadProps {
  className?: string;
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  children: React.ReactNode | string;
}

interface ICellProps<T> {
  className?: string;
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  children: ({ index, data }: { index: number; data: T }) => React.ReactNode;
}

interface IPropsByComponent {
  Head: IHeadProps;
  Column: IColumnProps;
  Cell: ICellProps<any>;
}

interface ITableProps<T> {
  data: T[];
  separated?: boolean;
  onClick?(): void;
}

function Table<T>(props: ISharedProps & ITableProps<T>) {
  const classes = useStyles();
  const { children, className, separated, data } = props;

  const getChildren = <C extends keyof IPropsByComponent>(child: React.ReactNode, componentName: C) => {
    return React.Children.toArray(child).filter(
      (item): item is React.ReactElement<IPropsByComponent[C], any> =>
        !!item && React.isValidElement(item) && (item.type as any).displayName === componentName,
    );
  };

  const columns = getChildren(children, 'Column');

  const headCells = columns.map(column => getChildren(column.props.children, 'Head'));
  const flattenHeadCells = R.flatten<React.ReactElement<IHeadProps>>(headCells);

  const bodyCells = columns.map(column => getChildren(column.props.children, 'Cell'));
  const flattenBodyCells = R.flatten<React.ReactElement<ICellProps<any>>>(bodyCells);

  return (
    <table
      className={cn(classes.root, className, {
        [classes.separated]: separated,
      })}
    >
      <thead>
        {flattenHeadCells.map((headCell, index) => (
          <td key={index} align={headCell.props.align}>
            {headCell.props.children}
          </td>
        ))}
      </thead>
      <tbody>
        {data.map((dataRow, index) => (
          <tr key={index} className={cn(props.className, { [classes.clickable]: !!props.onClick })}>
            {flattenBodyCells.map((cell, cellIndex) => (
              <td key={cellIndex} align={cell.props.align}>
                {cell.props.children({ index, data: dataRow })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Column(_props: IColumnProps) {
  return <noscript />;
}

function Head(_props: IHeadProps) {
  return <noscript />;
}

function Cell<T>(_props: ICellProps<T>) {
  return <noscript />;
}

export { Table };
export default attachStaticFields(Table, { Column, Head, Cell });

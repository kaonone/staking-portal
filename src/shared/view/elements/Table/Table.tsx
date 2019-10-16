import React from 'react';
import cn from 'classnames';
import { useStyles } from './Table.style';
import { attachStaticFields } from 'shared/helpers';

interface IColumnProps {
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

interface ITableProps<T> {
  className?: string;
  children?: React.ReactNode;
  data: T[];
  separated?: boolean;
  onClick?(): void;
}

function Table<T>(props: ITableProps<T>) {
  const classes = useStyles();
  const { children, className, separated, data } = props;

  interface IAggregatedColumn {
    headProps?: IHeadProps;
    cellProps?: ICellProps<T>;
  }

  const columns: IAggregatedColumn[] = filterChildrenByName(children, 'Column').map(column => ({
    headProps: (filterChildrenByName(column.props.children, 'Head')[0] || {}).props,
    cellProps: (filterChildrenByName(column.props.children, 'Cell')[0] || {}).props,
  }));

  const needToRenderHead = columns.every(column => column.headProps);

  return (
    <table
      className={cn(classes.root, className, {
        [classes.separated]: separated,
      })}
    >
      {needToRenderHead && (
        <thead>
          <tr>
            {columns.map(({ headProps }, index) =>
              headProps ? (
                <td key={index} align={headProps.align}>
                  {headProps.children}
                </td>
              ) : (
                <td key={index} />
              ),
            )}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((dataRow, index) => (
          <tr key={index} className={cn(props.className, { [classes.clickable]: !!props.onClick })}>
            {columns.map(({ cellProps }, cellIndex) =>
              cellProps ? (
                <td key={cellIndex} align={cellProps.align}>
                  {cellProps.children({ index, data: dataRow })}
                </td>
              ) : (
                <td key={cellIndex} />
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface IPropsByComponent {
  Head: IHeadProps;
  Column: IColumnProps;
  Cell: ICellProps<any>;
}

function filterChildrenByName<C extends keyof IPropsByComponent>(child: React.ReactNode, componentName: C) {
  return React.Children.toArray(child).filter(
    (item): item is React.ReactElement<IPropsByComponent[C], any> =>
      React.isValidElement(item) && (item.type as any).displayName === componentName,
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

type MakeTableType<T> = React.StatelessComponent<ITableProps<T>> & {
  Column: React.StatelessComponent<IColumnProps>;
  Head: React.StatelessComponent<IHeadProps>;
  Cell: React.StatelessComponent<ICellProps<T>>;
};

export { Table, MakeTableType };
export default attachStaticFields(Table, { Column, Head, Cell });

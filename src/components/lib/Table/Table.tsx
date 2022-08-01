import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconButton,
  IconButtonProps,
} from "components/lib/IconButton/IconButton";
import * as React from "react";
import "./table.scss";

export type TableColumn<R, D> = {
  displayName: string;
  accessor: (row: R) => D;
  render?: (row: R) => React.ReactNode;
  width?: string;
};

export type RowAction = {
  onMouseOver: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onClick: React.MouseEventHandler;
};

export type TableProps<R> = {
  columns: TableColumn<R, R[keyof R]>[];
  rows: R[];
  rowActions?: (row: R) => Partial<RowAction>;
  getActionButtons?: (row: R) => IconButtonProps[];
};

const BLOCK = "lib_table";

export const Table = <R extends unknown>({
  columns,
  rows,
  getActionButtons,
  rowActions = () => ({}),
}: TableProps<R>) => {
  const renderRows = React.useMemo(
    () =>
      rows.map((row, rIndex) => (
        <tr
          key={rIndex}
          onClick={rowActions(row)?.onClick}
          className={`${BLOCK}--row`}
        >
          {columns.map(({ render, accessor, width }, cIndex) => (
            <td key={`${rIndex}-${cIndex}`} style={{ width }}>
              {render?.(row) ?? String(accessor(row))}
            </td>
          ))}
          {getActionButtons && (
            <>
              <td className={`${BLOCK}_action-buttons`}>
                {getActionButtons(row).map((props, index) => (
                  <IconButton key={index} {...props} />
                ))}
              </td>
            </>
          )}
        </tr>
      )),
    [columns, rows]
  );
  return (
    <table className={BLOCK}>
      <thead>
        <tr className={`${BLOCK}_header-row`}>
          {columns.map(({ displayName, width }, index) => (
            <th key={index} style={{ width }}>
              {displayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
};

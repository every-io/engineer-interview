import { Card } from "components/UI";

import { IColumnProps } from "types/Column";

import { ColumnContainer, ColumnTitle } from "styles/Column";

const Column = ({ title, children }: IColumnProps) => (
  <Card className={ColumnContainer()} corner={"round"} elevation={"raised"}>
    <h2 className={ColumnTitle()}>{title}</h2>
    <div>{children}</div>
  </Card>
);

export default Column;

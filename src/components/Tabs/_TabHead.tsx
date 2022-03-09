import * as React from "react"

export interface TabHeadProps {
  className?: string;
  onTabSelect?: React.MouseEventHandler<HTMLLIElement>;
  children: React.ReactNode;
}

export const TabHead: React.VFC<TabHeadProps> = (props) => {
  return (
    <li className={props.className} onClick={props.onTabSelect}>
      <a>{props.children}</a>
    </li>
  )
}

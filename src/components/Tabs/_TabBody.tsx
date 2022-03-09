import * as React from "react"

interface TabBodyProps {
  children: React.ReactNode;
}

export const TabBody: React.VFC<TabBodyProps> = (props) => {

  return (
    <>
      {props.children}
    </>
  )
}

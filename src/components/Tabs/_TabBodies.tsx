import * as React from "react"

interface TabBodiesProps {
  selectedTabIndex: number;
  children: React.ReactNode;
}

export const TabBodies: React.VFC<TabBodiesProps> = (props) => {

  return (
    <>
      {React.Children.toArray(props.children).filter((child, index) =>
        index === props.selectedTabIndex && child
      )}
    </>
  )
}

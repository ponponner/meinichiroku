import clsx from "clsx";
import * as React from "react"
import { TabHeadProps } from "./_TabHead";

interface TabHeadsProps {
  selectedTabIndex: number;
  onTabSelect: (tabIndex: number) => void;
  children: React.ReactNode;
}

export const TabHeads: React.VFC<TabHeadsProps> = (props) => {

  function modifyChild(child: React.ReactElement<TabHeadProps>, index: number) {
    return React.cloneElement(
      child,
      {
        className: clsx(child.props.className, {
          'is-active': index === props.selectedTabIndex,
        }),
        onTabSelect: () => props.onTabSelect(index),
      }
    );
  }

  return (
    <div className="tabs is-centered is-boxed">
      <ul>
        {React.Children.map(props.children, (child, i) => modifyChild(child as React.ReactElement<TabHeadProps>, i))}
      </ul>
    </div>
  )
}

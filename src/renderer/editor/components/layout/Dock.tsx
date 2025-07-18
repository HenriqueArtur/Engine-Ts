import { Tab, Tabs } from "@heroui/react";
import { type JSX, type Key, useState } from "react";
import { type Panel, PanelSelectTabs } from "../panels";

type DockProps = {
  panels: Panel[];
  default_panel: Panel;
  height?: number;
  id?: string;
};

export default function Dock({ panels, default_panel, height, id }: DockProps) {
  const tabs_itens = PanelSelectTabs(panels);
  const [selected, setSelected] = useState<string>(default_panel);

  const Panel = tabs_itens.find((tab) => tab.key === selected)?.content as (
    ...props: unknown[]
  ) => JSX.Element;

  return (
    <div id={id} className="flex flex-col" style={{ height: height ? height : "100%" }}>
      <Tabs
        key="generic-panel"
        aria-label="Generic Panel"
        variant="solid"
        size="sm"
        selectedKey={selected}
        onSelectionChange={(key: Key) => setSelected(key as string)}
        classNames={{
          base: "p-0 m-0",
          tabList: "bg-content1 rounded-none pb-[0px]",
          cursor: "dark:bg-content2 bg-content2 shadow-none rounded-t-sm rounded-b-none p-0 m-0",
        }}
      >
        {tabs_itens.map((tab) => (
          <Tab key={tab.key} title={tab.tab_name} />
        ))}
      </Tabs>
      <div id={selected} className="grow bg-content2 p-0 m-0">
        <Panel />
      </div>
    </div>
  );
}

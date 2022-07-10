import React from "react";

import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from "victory";

const Graph = () => {
  const data = [
    { month: "Apr", value: 13000 },
    { month: "Mavalue", value: 16500 },
    { month: "Jun", value: 14250 },
    { month: "Jul", value: 19000 },
    { month: "Aug", value: 25000 },
    { month: "Sep", value: 23000 },
    { month: "Oct", value: 21000 },
    { month: "Nov", value: 19000 },
    { month: "Dec", value: 19700 },
    { month: "Jan", value: 17200 },
    { month: "Feb", value: 17800 },
    { month: "Mar", value: 18200 },
  ];

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        padding={75}
      >
        <VictoryAxis
          fixLabelOverlap
          style={{ tickLabels: { padding: 16, fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} x="month" y="value" />
      </VictoryChart>
    </div>
  );
};

export default Graph;

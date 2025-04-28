import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function CostStatusGauge() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>The cost status of the current phase</h2>

      <ReactSpeedometer
        maxValue={30000}
        value={3000}
        needleColor="red"
        startColor="green"
        segments={3}
        endColor="red"
        currentValueText="$30,000"
        customSegmentStops={[0, 8000, 15000, 26000, 30000]}
        segmentColors={["#00C49F", "#FFBB28", "#FF4C4C"]}
        ringWidth={30}
        width={300}
        height={200}
      />

      <p>12 1/4" × 9 5/8"</p>
    </div>
  );
}

import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function CostStatusGauge() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>The cost status of the current phase</h2>

      <ReactSpeedometer
       maxValue={30000} // Maximum value on the gauge
       value={4900} // Current value to display on the gauge
       needleColor="black" // Color of the needle pointer
       
       segments={3} // Total number of segments
       currentValueText="$4,900" // Text displayed under the gauge showing the current value

       // Defining custom segment stops:
       // This will create 3 segments:
       //  - 0 to 8000
       //  - 8000 to 15000
       //  - 16000 to 30000

       customSegmentStops={[0, 8000, 16000, 30000]}



        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={30}
        width={300}
        height={200}
      />

      <p>12 1/4" × 9 5/8"</p>
    </div>
  );
}

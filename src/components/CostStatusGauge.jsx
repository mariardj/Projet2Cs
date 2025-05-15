import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function CostStatusGauge({ small = false }) {
  const size = small
    ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
    : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

  return (
    <div
      style={{
        width: size.width + 40,
        padding: '16px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        boxSizing: 'border-box',
        
      }}
    >
      <h3 style={{ fontSize: size.fontSize, marginBottom: '12px' }}>
        Cost status of current phase
      </h3>

      <ReactSpeedometer
        maxValue={30000}
        value={4900}
        needleColor="black"
        segments={3}
        currentValueText="$4,900"
        customSegmentStops={[0, 8000, 16000, 30000]}
        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={size.ringWidth}
        width={size.width}
        height={size.height}
      />

      {!small && <p style={{ fontSize: '13px' }}>12 1/4" × 9 5/8"</p>}
    </div>
  );
}

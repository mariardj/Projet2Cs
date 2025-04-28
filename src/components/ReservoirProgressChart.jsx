import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

// Chart data structure:
// - date: String representing the date label (e.g., 'Jan 1')
// - value: Numeric value representing the reservoir depth level
const data = [
  { date: 'Jan 1', value: 0 },
  { date: 'Jan 8', value: 100 },
  { date: 'Jan 16', value: 200 },
  { date: 'Jan 24', value: 250 },
  { date: 'Jan 31', value: 300 },
  { date: 'Feb 1', value: 220 },
];

export default function ReservoirProgressChart() {
  return (
    <div style={{ background: "white", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Progression des réservoirs atteints</h2>
      <p style={{ color: "#000000", marginBottom: "20px" }}>Niveau de profondeur</p>

      {/* 
        Responsive chart container that adapts to parent size
        Expects data with date/value properties as shown above
      */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Gradient definition for the area fill */}
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Chart grid lines and axes */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />  {/* Renders date labels */}
          <YAxis />  {/* Renders value scale */}
          <Tooltip />  {/* Shows data on hover */}

          {/* Visual elements: */}
          <Area 
            type="monotone" 
            dataKey="value"  // Uses the 'value' property from data
            fill="url(#colorLine)"  // Applies the gradient fill
          />
          <Line 
            type="monotone" 
            dataKey="value"  // Uses the 'value' property from data
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
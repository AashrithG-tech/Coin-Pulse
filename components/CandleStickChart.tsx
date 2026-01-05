'use client';
import React from 'react';

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = 'daily',
}: CandlestickChartProps) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>

        <div className="button-group">
          <span className="text-sm mx-2 font-medium text-purple-100/50">Period</span>
          <button key="1h" className="config-button" onClick={() => {}} disabled={loading}>
            1 hour
          </button>
        </div>
      </div>
    </div>
  );
};
export default CandleStickChart;

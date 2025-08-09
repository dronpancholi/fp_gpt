import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PerformanceChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}ms`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>DuckDuckGo</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Wikipedia</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Academic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>5s Threshold</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={5000} 
              stroke="hsl(var(--error))" 
              strokeDasharray="5 5"
              label={{ value: "5s Guarantee", position: "topRight" }}
            />
            <Line 
              type="monotone" 
              dataKey="duckduckgo" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
              name="DuckDuckGo"
            />
            <Line 
              type="monotone" 
              dataKey="wikipedia" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
              name="Wikipedia"
            />
            <Line 
              type="monotone" 
              dataKey="academic" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 3 }}
              name="Academic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
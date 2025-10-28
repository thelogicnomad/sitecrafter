import React from 'react';
    import {
      Radar,
      RadarChart,
      PolarGrid,
      PolarAngleAxis,
      PolarRadiusAxis,
      ResponsiveContainer,
      Tooltip,
    } from 'recharts';
    import { mockSkillData } from '@/features/data/MockData';
    import { useTheme } from '@/features/theme/useTheme';

    const SkillRadarChart: React.FC = () => {
      const { theme } = useTheme();
      const isDark = theme === 'dark';

      return (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockSkillData}>
            <PolarGrid stroke={isDark ? '#374151' : '#E5E7EB'} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#F0F4F8' : '#0A0F1E' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Proficiency"
              dataKey="proficiency"
              stroke="hsl(185, 90%, 55%)"
              fill="hsl(185, 90%, 55%)"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#0A0F1E' : '#F0F4F8',
                borderColor: 'hsl(185, 90%, 55%)',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      );
    };

    export default SkillRadarChart;
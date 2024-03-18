"use client"

import { SyntheticEvent, useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import {MusicThemeType, TimerType} from "@/app/lib/types";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type SettingsProps = {
  themes: MusicThemeType[];
  timers: TimerType[];
}
export default function Settings({themes, timers}: SettingsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings">
          <Tab label="Themes" {...tabProps(0)} />
          <Tab label="Timers" {...tabProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {themes.map(theme => {
          return <span key={theme.id}><span><b>{theme.name}</b>: {theme.url || "-"}</span><br/></span>
        })}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Some pomodoro timers settings will appear here one day...

        {timers.map(timer => <><span>{timer.duration}</span><br /></>)}
      </CustomTabPanel>
    </Box>
  </>
}

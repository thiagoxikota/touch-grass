import { Routes, Route } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { Index } from './pages/Index';
import { Brand } from './pages/foundations/Brand';
import { Color } from './pages/foundations/Color';
import { Typography } from './pages/foundations/Typography';
import { Spacing } from './pages/foundations/Spacing';
import { Borders } from './pages/foundations/Borders';
import { Grid } from './pages/foundations/Grid';
import { Motion } from './pages/foundations/Motion';
import { States } from './pages/foundations/States';
import { ButtonPage } from './pages/primitives/ButtonPage';
import { InputPage } from './pages/primitives/InputPage';
import { BadgePage } from './pages/primitives/BadgePage';
import { CardPage } from './pages/primitives/CardPage';
import { TagPage } from './pages/primitives/TagPage';
import { DividerPage } from './pages/primitives/DividerPage';
import { StatPage } from './pages/primitives/StatPage';
import { TimerPage } from './pages/primitives/TimerPage';
import { LeaderboardRowPage } from './pages/patterns/LeaderboardRowPage';
import { FocusTimerDisplayPage } from './pages/patterns/FocusTimerDisplayPage';
import { BeRealStampPage } from './pages/patterns/BeRealStampPage';
import { PatternInterruptModalPage } from './pages/patterns/PatternInterruptModalPage';
import { SessionSummaryCardPage } from './pages/patterns/SessionSummaryCardPage';

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/foundations/brand" element={<Brand />} />
        <Route path="/foundations/color" element={<Color />} />
        <Route path="/foundations/typography" element={<Typography />} />
        <Route path="/foundations/spacing" element={<Spacing />} />
        <Route path="/foundations/borders" element={<Borders />} />
        <Route path="/foundations/grid" element={<Grid />} />
        <Route path="/foundations/motion" element={<Motion />} />
        <Route path="/foundations/states" element={<States />} />
        <Route path="/primitives/button" element={<ButtonPage />} />
        <Route path="/primitives/input" element={<InputPage />} />
        <Route path="/primitives/badge" element={<BadgePage />} />
        <Route path="/primitives/card" element={<CardPage />} />
        <Route path="/primitives/tag" element={<TagPage />} />
        <Route path="/primitives/divider" element={<DividerPage />} />
        <Route path="/primitives/stat" element={<StatPage />} />
        <Route path="/primitives/timer" element={<TimerPage />} />
        <Route path="/patterns/leaderboard-row" element={<LeaderboardRowPage />} />
        <Route path="/patterns/focus-timer-display" element={<FocusTimerDisplayPage />} />
        <Route path="/patterns/bereal-stamp" element={<BeRealStampPage />} />
        <Route path="/patterns/pattern-interrupt-modal" element={<PatternInterruptModalPage />} />
        <Route path="/patterns/session-summary-card" element={<SessionSummaryCardPage />} />
      </Routes>
    </Shell>
  );
}

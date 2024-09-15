'use client';

import { CHANGELOG_URL } from '@repo/constants';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BaseButton } from '../../base/button';
import { BugReportPrompt, reportBug } from '../bug-report';
import { ArrowUpIcon } from '../icons/arrow-up';
import { ChangeLogIcon } from '../icons/change-log';
import { SettingsIcon } from '../icons/settings';
import { ThemeIcon } from '../icons/theme';
import { BugIcon } from '../icons/bug';
import { ZINDEXES } from '../z-indexes';
import { cn } from '../../utils/classnames';

// Lazy-load the theme toggle, since it relies on client context
const ThemeSelectButton = dynamic(
  () => import('../theme-select/theme-select-button'),
  {
    ssr: false,
    loading: () => (
      <BaseButton color="dark/white">
        <ThemeIcon className="h-5 w-5" />
      </BaseButton>
    ),
  },
);

interface GlobalActionButtonProps {
  username: string;
}

export function GlobalActionButtons({ username }: GlobalActionButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'ui-fixed ui-flex ui-flex-row-reverse ui-w-[98vw] ui-bottom-[8px] ui-gap-x-1',
        ZINDEXES.GLOBAL_ACTION_BUTTONS,
      )}
    >
      <SettingsButton
        onToggle={() => {
          setOpen((prev) => !prev);
        }}
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="ui-bg-background-solid ui-isolate ui-inline-flex ui-min-w-[140px] ui-gap-x-1 ui-rounded-md ui-shadow-sm"
            exit={{ opacity: 0, x: 50 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="ui-sr-only">Theme Select</span>
              <ThemeSelectButton />
            </div>
            <div>
              <span className="ui-sr-only">Report Bug</span>
              <ReportBugButton username={username} />
            </div>
            <div>
              <span className="ui-sr-only">Change Log</span>
              <ChangeLogButton />
            </div>
            <div>
              <span className="ui-sr-only">Back to Top</span>
              <BackToTopButton />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SettingsButton({ onToggle }: { onToggle: () => void }) {
  return (
    <BaseButton color="yellow" onClick={onToggle}>
      <SettingsIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  );
}

function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <BaseButton color="cyan" onClick={handleBackToTopClick}>
      <ArrowUpIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  );
}

function ChangeLogButton() {
  return (
    <BaseButton color="violet" href={CHANGELOG_URL} target="_blank">
      <ChangeLogIcon className="ui-h-5 ui-w-5" />
    </BaseButton>
  );
}

function ReportBugButton({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  function handleReportBug(report: string) {
    if (!report || report.trim() === '') {
      setOpen(false);
      toast.error('Please provide a bug report');
      return;
    }
    reportBug({ report, username })
      .then(({ message }) => {
        toast.success(message);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
        setOpen(false);
      });
  }

  return (
    <>
      <BugReportPrompt
        key={open ? 'open' : 'closed'}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={handleReportBug}
        open={open}
      />
      <BaseButton
        color="green"
        onClick={() => {
          setOpen(true);
        }}
      >
        <BugIcon className="ui-h-5 ui-w-5" />
      </BaseButton>
    </>
  );
}

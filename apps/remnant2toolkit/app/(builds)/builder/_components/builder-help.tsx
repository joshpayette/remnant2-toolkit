'use client';

import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  BaseDivider,
  BaseLink,
  OptionalOffIcon,
  QuestionIcon,
} from '@repo/ui';
import { useState } from 'react';

import { RandomBuildButton } from '@/app/(builds)/builder/_components/random-build-button';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import type { Item } from '@/app/(items)/_types/item';

const sections = [
  {
    title: 'Sharing Builds',
    description: (
      <>
        Builds can be shared by clicking the Share Build button on the Builder,
        which will automatically copy the build URL to your clipboard.
        <br /> <br />
        If you are not signed into the Toolkit, the URL can get quite long. In
        this situation, it is suggested to click the Generate Image button. This
        will open a dialog with an image that you can download or copy/paste to
        share the build. This is often better than the long URL and preferred by
        the community.
      </>
    ),
    sample: null,
  },
  {
    title: 'Optional Items',
    description: (
      <>
        Items can be marked optional if they aren't required in order for the
        build to be effective. Optional items are shown with a dotted border.
        Items can be toggled on/off by clicking the{' '}
        <OptionalOffIcon className="h-4 w-4 text-yellow-500" /> icon at the top
        left of each item button when creating or editing a build.
      </>
    ),
    sample: (
      <ItemButton
        item={{ ...(archetypeItems[0] as Item), optional: true }}
        isEditable={false}
        isScreenshotMode={false}
        manualWordBreaks={true}
      />
    ),
  },
  {
    title: 'Armor Calculator',
    description: (
      <>
        Clicking the Armor Calculator button will open a dialog that will
        suggest items to reach a specified weight class. It will account for any
        items you currently have equipped in the builder, so it's the perfect
        tool for trying to find the best possible option to reach a specific
        weight class.
      </>
    ),
    sample: null,
  },
  {
    title: 'Item Suggestions',
    description: (
      <>
        Clicking the Item Suggestions button will open a dialog that will allow
        you to view all items that match a specified item token. The dialog will
        allow you to also add the item to the builder if you don't already have
        it.
      </>
    ),
    sample: null,
  },
  {
    title: 'Detailed View',
    description: (
      <>
        Clicking the Detailed View button will open a dialog that will show you
        detailed information about the items in the build.
      </>
    ),
    sample: null,
  },
  {
    title: 'Random Builds',
    description: (
      <>
        If you've collected all or most of the items in the game and are looking
        for a challenge, you can click the Random Build button on the builder to
        generate a random build.
      </>
    ),
    sample: (
      <div className="w-full max-w-[250px]">
        <RandomBuildButton />
      </div>
    ),
  },
  {
    title: 'Supporter Frame',
    description: (
      <>
        Some builders have a custom yellow frame around their builds. This is
        awarded to users that contribute financially on the Patreon to pay for
        server costs. If you would like to support the site,{' '}
        <BaseLink
          href="https://www.patreon.com/JoshPayette"
          target="_blank"
          className="text-primary-400 underline"
        >
          please consider donating on Patreon.
        </BaseLink>
      </>
    ),
    sample: (
      <div className="bg-background-solid border-accent1-300 shadow-accent1-600 flex w-full max-w-md items-center justify-center border-2 p-4 shadow-lg" />
    ),
  },
] as const satisfies Array<{
  title: string;
  description: React.ReactNode;
  sample: React.ReactNode;
}>;

export function BuilderHelp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BaseDialog open={open} onClose={() => setOpen(false)} size="lg">
        <BaseDialogTitle>Builder Help</BaseDialogTitle>

        {sections.map((section) => (
          <>
            <BaseDialogBody className="mb-2">
              <BaseDialogTitle>{section.title}</BaseDialogTitle>
              <BaseDialogDescription className="mb-2">
                {section.description}
              </BaseDialogDescription>
              {section.sample}
            </BaseDialogBody>
            <BaseDivider />
          </>
        ))}
        <BaseDialogActions>
          <BaseButton onClick={() => setOpen(false)}>Close</BaseButton>
        </BaseDialogActions>
      </BaseDialog>
      <BaseButton
        color="yellow"
        aria-label="Builder Help"
        className="mb-4"
        onClick={() => setOpen(true)}
      >
        <QuestionIcon className="h-4 w-4" /> Help
      </BaseButton>
    </>
  );
}

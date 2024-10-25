'use client';

import { BaseLink, cn, NewWindowIcon } from '@repo/ui';
import { stripUnicode } from '@repo/utils';
import { type ReactNode, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import { v4 as uuidv4 } from 'uuid';

import { Tooltip } from '@/app/_components/tooltip';
import { ALL_BUILD_TAGS } from '@/app/(builds)/_constants/all-build-tags';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { allItems } from '@/app/(items)/_constants/all-items';
import { type Item } from '@/app/(items)/_types/item';
import { EXTERNAL_TOKENS } from '@/app/(items)/item-lookup/_constants/external-tokens';
import { INLINE_TOKENS } from '@/app/(items)/item-lookup/_constants/inline-tokens';

// Start with all description tokens, which are always included
const ALL_DESCRIPTION_TOKENS: string[] = [
  ...INLINE_TOKENS.map((tag) => tag.token).sort((a, b) => b.length - a.length), // Sort in descending order of length,
  ...EXTERNAL_TOKENS.map((tag) => tag.token).sort(
    (a, b) => b.length - a.length,
  ), // Sort in descending order of length,
];

function parseStringForToken({
  description,
  highlightBuildTokens,
  highlightExternalTokens,
  highlightItems,
  handleShowItemInfo,
}: {
  description: string;
  highlightItems: boolean;
  highlightBuildTokens: boolean;
  highlightExternalTokens: boolean;
  handleShowItemInfo: (itemName: string | undefined) => void;
}): ReactNode[] {
  // Escape special characters in the tokens
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

  const allDescriptionTokensRegex = new RegExp(
    `(${ALL_DESCRIPTION_TOKENS.map((token) => escapeRegExp(token)).join('|')})`,
    'g',
  );

  let replacedText = reactStringReplace(
    description,
    allDescriptionTokensRegex,
    (match, _i) => {
      const inlineToken = INLINE_TOKENS.find((tag) => tag.token === match);
      const externalToken = EXTERNAL_TOKENS.find((tag) => tag.token === match);

      const key = uuidv4();

      if (inlineToken) {
        if (inlineToken.description) {
          return (
            <Tooltip key={key} content={inlineToken.description}>
              {/** not changing this to new button */}
              <button
                className={cn('font-semibold', inlineToken.color)}
                aria-label={inlineToken.description}
              >
                {inlineToken.token}
              </button>
            </Tooltip>
          );
        } else {
          return (
            <span key={key} className={cn('font-semibold', inlineToken.color)}>
              {inlineToken.token}
            </span>
          );
        }
      } else if (externalToken) {
        if (!highlightExternalTokens) return match;
        if (externalToken.description) {
          return (
            <Tooltip key={key} content={externalToken.description}>
              {/** not changing this to new button */}
              <button
                className={cn('font-semibold', externalToken.color)}
                aria-label={externalToken.description}
              >
                {externalToken.token}
              </button>
            </Tooltip>
          );
        }
      } else {
        return match;
      }
    },
  );

  if (highlightItems) {
    const allItemNames = allItems
      .filter((item) => item.category !== 'relicfragment')
      .map((item) => item.name)
      .sort((a, b) => b.length - a.length); // Sort in descending order of length

    const allItemNamesRegex = new RegExp(
      `\\b(${allItemNames.map((token) => escapeRegExp(token)).join('|')})`,
      'gi',
    );

    replacedText = reactStringReplace(
      replacedText,
      allItemNamesRegex,
      (match, _i) => {
        const itemName = allItemNames.find(
          (itemName) => itemName.toLowerCase() === match.toLowerCase(),
        );
        const item = allItems.find((item) => item.name === itemName);
        const itemNameButton = (
          <button
            key={uuidv4()}
            className="p-0 font-bold"
            onClick={() => handleShowItemInfo(itemName)}
          >
            {itemName}
          </button>
        );

        return item && item.description ? (
          <Tooltip
            key={uuidv4()}
            content={
              item.description.length >= 200
                ? item.description.substring(0, 200) + '...'
                : item.description
            }
          >
            {itemNameButton}
          </Tooltip>
        ) : (
          itemNameButton
        );
      },
    );
  }

  if (highlightBuildTokens) {
    const allBuildTags = ALL_BUILD_TAGS.map((tag) => tag.label).sort(
      (a, b) => b.length - a.length,
    ); // Sort in descending order of length
    const allBuildTagsRegex = new RegExp(
      `(${allBuildTags.map((token) => escapeRegExp(token)).join('|')})`,
      'gi',
    );

    replacedText = reactStringReplace(
      replacedText,
      allBuildTagsRegex,
      (match, _i) => {
        const tag = ALL_BUILD_TAGS.find((tag) => tag.label === match);
        if (!tag) return match;
        return (
          <span key={uuidv4()} className={cn('font-semibold', tag.colors.text)}>
            {match}
          </span>
        );
      },
    );
  }

  return replacedText;
}

type Props = {
  description: string;
  highlightItems: boolean;
  highlightBuildTokens: boolean;
  highlightExternalTokens: boolean;
} & (
  | {
      showPopoutIcon: true;
      targetUrl: string;
    }
  | {
      showPopoutIcon?: false;
      targetUrl?: never;
    }
);

export function DescriptionWithTokens({
  description,
  highlightItems,
  highlightBuildTokens,
  highlightExternalTokens,
  showPopoutIcon = false,
  targetUrl,
}: Props) {
  const [item, setItem] = useState<Item | null>(null);
  const isItemInfoOpen = Boolean(item);

  function handleShowItemInfo(itemName: string | undefined) {
    if (!itemName) return;
    const item = allItems.find((item) => item.name === itemName);
    if (!item) return;
    setItem(item);
  }

  return (
    <>
      <ItemInfoDialog
        item={item}
        open={isItemInfoOpen}
        onClose={() => setItem(null)}
      />
      {showPopoutIcon && targetUrl && targetUrl !== '' ? (
        <div className="mb-1 flex items-center justify-start pb-0">
          <BaseLink
            href={targetUrl}
            target="_blank"
            className="border-secondary-800 border p-0.5"
          >
            <NewWindowIcon className="text-secondary-500 mr-1 h-4 w-4" />
            <span className="text-secondary-300 text-sm">
              Open in new window
            </span>
          </BaseLink>
        </div>
      ) : null}
      <span className="sr-only">{stripUnicode(description)}</span>
      <div className="" aria-hidden="true">
        {parseStringForToken({
          description,
          highlightItems,
          highlightBuildTokens,
          highlightExternalTokens,
          handleShowItemInfo,
        })}
      </div>
    </>
  );
}

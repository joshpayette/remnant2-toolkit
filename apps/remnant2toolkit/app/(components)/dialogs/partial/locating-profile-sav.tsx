import { BaseDialogBody, BaseDialogTitle } from '@repo/ui';
import { BaseCode, BaseText, BaseTextLink } from '@repo/ui';

export default function LocatingProfileSav() {
  return (
    <div className="bg-background mt-2 p-4">
      <BaseDialogTitle>Locating Your Save</BaseDialogTitle>
      <BaseDialogBody>
        Steam
        <BaseText>
          Your save file is located at the following location:
          <br />
          <BaseCode>
            C:\Users\_your_username_\Saved
            Games\Remnant2\Steam\_steam_id_\profile.sav
          </BaseCode>
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        XBox Game Pass
        <BaseText>
          This is a bit more complicated, but you can follow{' '}
          <BaseTextLink
            href="https://www.reddit.com/r/remnantgame/comments/187rfdq/transferring_save_files_from_pcsteam_to_xbox/"
            target="_blank"
          >
            this guide on Reddit by SpectralHunt
          </BaseTextLink>
          . Once you find your file, you can rename it to{' '}
          <BaseCode>profile.sav</BaseCode> and import it here.
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        XBox
        <BaseText>
          I don&apos;t have the ability to test this, but I believe you can
          export your save file to a USB drive, then rename the file to
          <BaseCode>profile.sav</BaseCode> and import. If you can confirm this
          works, please use the blue bug report icon in the bottom right to get
          in touch.
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        Playstation
        <BaseText>
          I could use some help with this one. If you know where the save is, or
          can provide a save that I can test with, I will happily try to make
          this work. Please use the blue bug report icon in the bottom right to
          get in touch.
        </BaseText>
      </BaseDialogBody>
    </div>
  );
}

import { TranslationKeys } from '#/generated/translationKeys';
import FuneralImage from '#/assets/images/funeral.jpg';
import PersonalInformation from '#/pages/FuneralPlan/PersonalInformation';

export interface Section {
  title: TranslationKeys;
  id: string;
  description: TranslationKeys;
  element?: JSX.Element;
  sectionDescription?: string;
  images?: string[];
  children?: Section[];
}

export const QUIZ_SIDE_BAR_SECTIONS: Section[] = [
  {
    description: 'funeralPackage.personalInformation.description',
    element: <PersonalInformation />,
    id: 'personal-information',
    title: 'funeralPackage.personalInformation.title',
  },
  {
    description: 'funeralPackage.trustedContract.description',
    id: 'trusted-contacts',
    title: 'funeralPackage.trustedContract.title',
  },
  {
    children: [
      {
        description: 'funeralPackage.organDonation.description',
        id: 'organ-donation',
        images: [FuneralImage, FuneralImage, FuneralImage],
        sectionDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate bibendum proin sapien, augue sapien ut. Faucibus faucibus purus sollicitudin consequat tellus.',
        title: 'funeralPackage.organDonation.title',
      },
      {
        description: 'funeralPackage.presentation.description',
        id: 'presentation',
        title: 'funeralPackage.presentation.title',
      },
      {
        description: 'funeralPackage.conservationCare.description',
        id: 'conservation-care',
        title: 'funeralPackage.conservationCare.title',
      },
      {
        description: 'funeralPackage.announcement.description',
        id: 'announcement',
        title: 'funeralPackage.announcement.title',
      },
      {
        description: 'funeralPackage.funeralPlanType.description',
        id: 'funeral-plan-type',
        title: 'funeralPackage.funeralPlanType.title',
      },
      {
        description: 'funeralPackage.casketMaterial.description',
        id: 'casket-material',
        title: 'funeralPackage.casketMaterial.title',
      },
      {
        description: 'funeralPackage.funeralType.description',
        id: 'funeral-type',
        title: 'funeralPackage.funeralType.title',
      },
      {
        description: 'funeralPackage.specificItems.description',
        id: 'specific-items',
        title: 'funeralPackage.specificItems.title',
      },
      {
        description: 'funeralPackage.music.description',
        id: 'music',
        title: 'funeralPackage.music.title',
      },
      {
        description: 'funeralPackage.textsPhotosForTribute.description',
        id: 'texts-photos-for-tribute',
        title: 'funeralPackage.textsPhotosForTribute.title',
      },
      {
        description: 'funeralPackage.travelingAboard.description',
        id: 'traveling-aboard',
        title: 'funeralPackage.travelingAboard.title',
      },
      {
        description: 'funeralPackage.funeralHome.description',
        id: 'funeral-home',
        title: 'funeralPackage.funeralHome.title',
      },
      {
        description: 'funeralPackage.specialWills.description',
        id: 'special-wills',
        title: 'funeralPackage.specialWills.title',
      },
    ],
    description: 'funeralPackage.yourFuneralPlan.description',
    id: 'your-funeral-plan',
    title: 'funeralPackage.yourFuneralPlan.title',
  },
  {
    description: 'funeralPackage.documents.description',
    id: 'documents',
    title: 'funeralPackage.documents.title',
  },
  {
    description: 'funeralPackage.personalAccounts.description',
    id: 'personal-accounts',
    title: 'funeralPackage.personalAccounts.title',
  },
  {
    description: 'funeralPackage.personalMemories.description',
    id: 'personal-memories',
    title: 'funeralPackage.personalMemories.title',
  },
];

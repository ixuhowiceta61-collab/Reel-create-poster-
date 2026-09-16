export type TextPosition = 'center' | 'top' | 'bottom' | 'center-left' | 'center-right';

export type BorderStyle = 'classic-gold' | 'ornate-filigree' | 'stamp-edge' | 'postal-frame' | 'minimal-vintage' | 'newspaper-border';

export type TypographyStyle =
  | 'elegant-bengali'
  | 'handwritten'
  | 'vintage-serif'
  | 'typewriter'
  | 'classic'
  | 'calligraphy'
  | 'old-newspaper';

export type VintageEffect =
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'bw'
  | 'film-grain'
  | 'dust'
  | 'scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type AspectRatioFormat = 'postcard' | 'square' | 'story' | 'facebook' | 'whatsapp';

export interface AspectRatioConfig {
  id: AspectRatioFormat;
  name: string;
  nameBn: string;
  ratio: string;
  aspectValue: number; // width / height
  width: number;
  height: number;
  icon: string;
}

export type Language = 'bn' | 'en';

export interface PostcardTemplate {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryEn?: string;
  image: string;
  artworkType: string;
  defaultQuote: string;
  defaultQuoteEn?: string;
  defaultRecipient?: string;
  defaultRecipientEn?: string;
  defaultSender?: string;
  defaultSenderEn?: string;
  defaultDate?: string;
  defaultDateEn?: string;
  textPosition: TextPosition;
  defaultTypography: TypographyStyle;
  borderStyle: BorderStyle;
  themeColor: string;
  tags: string[];
  tagsEn?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  collection?: 'romantic' | 'rainy' | 'letter' | 'classic';
}

export interface RomanticQuote {
  id: string;
  text: string;
  textEn?: string;
  author?: string;
  authorEn?: string;
  category: string;
  categoryEn?: string;
  mood?: string;
  moodEn?: string;
  tags: string[];
  tagsEn?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  quote: string;
  quoteEn?: string;
  image: string;
  artworkType: string;
  category: string;
  tags: string[];
  themeColor: string;
}

export interface CategoryInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  description: string;
  accentColor: string;
}

export interface CustomTextStyle {
  fontFamily: TypographyStyle;
  fontSize: number; // in pt/px relative scale
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number; // em
  lineHeight: number; // multiplier
  textColor: string;
  textPosition: TextPosition;
}

export interface PosterFormState {
  templateId: string;
  recipient: string;
  mainQuote: string;
  sender: string;
  date: string;
  textStyle: CustomTextStyle;
  effect: VintageEffect;
  aspectRatio: AspectRatioFormat;
  showStamp: boolean;
  showPostmark: boolean;
}

export type ActivePage =
  | 'home'
  | 'reels'
  | 'letter'
  | 'create'
  | 'postcards'
  | 'quotes'
  | 'gallery'
  | 'categories'
  | 'favorites'
  | 'privacy'
  | 'terms'
  | 'contact';

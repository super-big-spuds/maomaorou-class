import type { Schema, Attribute } from '@strapi/strapi';

export interface BuyOptionBuyOption extends Schema.Component {
  collectionName: 'components_buy_option_buy_options';
  info: {
    displayName: 'buy-option';
    icon: 'filter';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface LessonContentTextContent extends Schema.Component {
  collectionName: 'components_lesson_content_text_contents';
  info: {
    displayName: 'TextContent';
    icon: 'filter';
    description: '';
  };
  attributes: {
    richText: Attribute.RichText & Attribute.Required;
  };
}

export interface LessonContentVideoContent extends Schema.Component {
  collectionName: 'components_lesson_content_video_contents';
  info: {
    displayName: 'VideoContent';
    icon: 'slideshow';
  };
  attributes: {
    video: Attribute.Media & Attribute.Required;
  };
}

export interface LessonContentYoutubeLesson extends Schema.Component {
  collectionName: 'components_lesson_content_youtube_lessons';
  info: {
    displayName: 'YoutubeLesson';
    icon: 'monitor';
  };
  attributes: {
    url: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'youtube embed\u7DB2\u5740'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'buy-option.buy-option': BuyOptionBuyOption;
      'lesson-content.text-content': LessonContentTextContent;
      'lesson-content.video-content': LessonContentVideoContent;
      'lesson-content.youtube-lesson': LessonContentYoutubeLesson;
    }
  }
}

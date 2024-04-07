import type { Schema, Attribute } from '@strapi/strapi';

export interface LessonContentTextContent extends Schema.Component {
  collectionName: 'components_lesson_content_text_contents';
  info: {
    displayName: 'TextContent';
    icon: 'apps';
  };
  attributes: {
    richText: Attribute.Blocks & Attribute.Required;
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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'lesson-content.text-content': LessonContentTextContent;
      'lesson-content.video-content': LessonContentVideoContent;
    }
  }
}

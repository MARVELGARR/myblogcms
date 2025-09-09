
import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { MarkdownKit } from '@/components/markdown-kit';
import { DiscussionKit } from '../discussion-kit';
import { CommentKit } from '../comment-kit';
import { SuggestionKit } from '../suggestion-kit';

export const ViewingKit = [
    ...MarkdownKit,
    
      // Collaboration,
       ...DiscussionKit,
       ...CommentKit,
       ...SuggestionKit,
]

export type MyViewer = TPlateEditor<Value, (typeof ViewingKit)[number]>;

export const useEditor = () => useEditorRef<MyViewer>();
// src/Tiptap.jsx
import editorStyles from "../styles/editorStyles.css"
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'

// define your extension array
const extensions = [
  StarterKit,
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
]

const content = '<p>Hello World!</p>'

const EditorComponent = () => {
  return (
    <div className="editor">
      <EditorProvider extensions={extensions} content={content}>
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
    </EditorProvider>
    </div>
    
  )
}

export default EditorComponent
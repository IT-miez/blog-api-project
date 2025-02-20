import { Editor } from 'react-draft-wysiwyg';
import '../styles/editorStyles.css';

const EditorComponent = ({ editorState, setEditorState }) => {
    const onEditorStateChange = (value) => {
        setEditorState(value);
    };

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="draftjs-wrapper"
        />
    );
};

export default EditorComponent;

import JoditEditor from "jodit-react";
import React, { useMemo, useRef } from "react";

const EditorBox = ({ value, setValue, placeholder }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      spellcheck: true,
      language: "en",
      focus: true,
      height: 300,
    }),
    [placeholder]
  );

  const handleBlur = () => {
    const currentContent = editor.current.value;
    setValue(currentContent);
  };
  return (
    <>
      <JoditEditor
        ref={editor}
        config={config}
        value={value}
        tabIndex={1}
        onBlur={handleBlur}
      />
    </>
  );
};

export default EditorBox;

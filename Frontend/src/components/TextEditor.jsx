import { Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

const TextEditor = ({ setContent }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setContents([
        { insert: "Hello\n", attributes: { header: 1 } },
        { insert: "Enter your Description here!\n" },
      ]);
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "sub",
    "super",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
  ];

  return (
    <Box className=" w-full">
      <div className=" w-full  ">
        <ReactQuill
          style={{ width: "100%", borderRadius: "20px" }}
          ref={quillRef}
          readOnly={readOnly}
          onChange={(content, delta, source, editor) => {
            setLastChange(editor.getContents());
            setContent(editor.getHTML());
          }}
          onChangeSelection={(range, source, editor) => {
            setRange(range);
          }}
          modules={modules}
          formats={formats}
        />
      </div>
    </Box>
  );
};

export default TextEditor;

// components/EditorBuilder.jsx
import { useEffect, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"
import ImageTool from "@editorjs/image"
import List from "@editorjs/list"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import CodeTool from "@editorjs/code"
import Delimiter from "@editorjs/delimiter"
import Table from "@editorjs/table"
import Warning from "@editorjs/warning"
import InlineCode from "@editorjs/inline-code"

export default function Editor({ onReady }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  return {
                    success: 1,
                    file: {
                      url: URL.createObjectURL(file), // Local preview
                    },
                  }
                },
              },
            },
          },
          list: List,
          quote: Quote,
          marker: Marker,
          code: CodeTool,
          delimiter: Delimiter,
          table: Table,
          warning: Warning,
          inlineCode: InlineCode,
        },
        onReady: () => {
          editorRef.current = editor
          onReady(editor)
        },
      })
    }

    return () => {
      editorRef.current?.destroy?.()
      editorRef.current = null
    }
  }, [onReady])

  return <div id="editorjs" className="border rounded p-4 bg-white" />
}

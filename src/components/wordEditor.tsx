import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const fontSizes = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px', '60px', '72px', '96px']

const WordLikeEditor: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState('')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrike, setIsStrike] = useState(false)
  const [fontSize, setFontSize] = useState('14px')
  const quillRef = useRef<ReactQuill>(null)

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  const handleFormat = useCallback((format: string) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      quill.format(format, !quill.getFormat()[format])
    }
  }, [])

  const updateFormatState = useCallback(() => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      const format = quill.getFormat()
      setIsBold(!!format.bold)
      setIsItalic(!!format.italic)
      setIsUnderline(!!format.underline)
      setIsStrike(!!format.strike)
      setFontSize(format.size || '14px')
    }
  }, [])

  useEffect(() => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      quill.on('selection-change', updateFormatState)
      return () => {
        quill.off('selection-change', updateFormatState)
      }
    }
  }, [updateFormatState])

  const handleFontSize = (size: string) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      quill.format('size', size)
    }
  }

  const modules = {
    toolbar: false,
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4 flex items-center space-x-2">
        <Select value={fontSize} onValueChange={handleFontSize}>
          <SelectTrigger className="w-[100px]">
            <SelectValue>{fontSize}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => handleFormat('bold')} data-state={isBold ? 'on' : 'off'}>
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => handleFormat('italic')} data-state={isItalic ? 'on' : 'off'}>
            I
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => handleFormat('underline')} data-state={isUnderline ? 'on' : 'off'}>
            U
          </ToggleGroupItem>
        </ToggleGroup>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Mais opções</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <ToggleGroup type="multiple" className="justify-start">
              <ToggleGroupItem value="strike" aria-label="Toggle strikethrough" onClick={() => handleFormat('strike')} data-state={isStrike ? 'on' : 'off'}>
                S
              </ToggleGroupItem>
              <ToggleGroupItem value="blockquote" aria-label="Toggle blockquote" onClick={() => handleFormat('blockquote')}>
                "
              </ToggleGroupItem>
              <ToggleGroupItem value="code-block" aria-label="Toggle code block" onClick={() => handleFormat('code-block')}>
                {'</>'}
              </ToggleGroupItem>
            </ToggleGroup>
          </PopoverContent>
        </Popover>
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  )
}

export default WordLikeEditor


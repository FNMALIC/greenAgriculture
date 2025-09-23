import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight'
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    ImageIcon,
    Code,
    Code2,
    Link2,
    Heading1,
    Heading2,
    Heading3
} from 'lucide-react';

// Initialize lowlight with common languages
const lowlight = createLowlight(common)

const MenuBar = ({ editor, onImageUpload }: {
    editor: any;
    onImageUpload: () => void;
}) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b p-2">
            <div className="flex flex-wrap gap-2 mb-2">
                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
                <Button
                    size="sm"
                    variant={editor.isActive('bold') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('italic') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('code') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <Code2 className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button
                    size="sm"
                    variant={editor.isActive('bulletList') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('orderedList') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('blockquote') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('link') ? 'default' : 'outline'}
                    onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                >
                    <Link2 className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onImageUpload}
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default function RichTextEditor({
                                           content,
                                           onChange
                                       }: {
    content: string;
    onChange: (content: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript',
                languageClassPrefix: 'language-'
            })
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 focus:outline-none'
            }
        },
        immediatelyRender: false // Fix for SSR hydration
    });

    const handleImageUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();

                    if (data.url) {
                        editor?.chain().focus().setImage({ src: data.url }).run();
                    }
                } catch (error) {
                    console.error('Upload failed:', error);
                }
            }
        };

        input.click();
    };

    return (
        <div className="border rounded-md">
            <MenuBar editor={editor} onImageUpload={handleImageUpload} />
            <EditorContent editor={editor} />
        </div>
    );
}
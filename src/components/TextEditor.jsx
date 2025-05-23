import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Text, Editor as SlateEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Element as SlateElement } from "slate";
import { useRef } from "react";

// Custom element types
const LIST_TYPES = ["numbered-list", "bulleted-list"];



const TextEditor = () => {
    const [editor] = useState(() => withReact(createEditor()));
    const editorRef = useRef(null);
    // Toggle text marks (bold, italic, underline)
    const toggleMark = (format) => {
        const isActive = isMarkActive(format);
        if (isActive) {
            editor.removeMark(format);
        } else {
            editor.addMark(format, true);
        }
    };

    // Check if a text mark is active
    const isMarkActive = (format) => {
        const marks = editor.marks || {};
        return marks[format] === true;
    };

    // Toggle block for bullet/number list
    const toggleBlock = (format) => {
        const isActive = isBlockActive(format);

        // Unwrap existing lists
        Transforms.unwrapNodes(editor, {
            match: (n) => SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
            split: true,
        });

        // If active, reset to paragraph
        if (isActive) {
            Transforms.setNodes(editor, { type: "paragraph" });
            return;
        }

        // Wrap selected content in list block
        Transforms.wrapNodes(editor, {
            type: format,
            children: [],
        });

        // Set the block type to list-item
        Transforms.setNodes(editor, { type: "list-item" });
    };


    // Check if a block is active (list)
    const isBlockActive = (format) => {
        const [match] = Editor.nodes(editor, {
            match: (n) => SlateElement.isElement(n) && n.type === format,
        });
        return !!match;
    };

    // Custom renderLeaf to style text
    const renderLeaf = useCallback((props) => {
        let { attributes, children, leaf } = props;

        if (leaf.bold) children = <strong>{children}</strong>;
        if (leaf.italic) children = <em>{children}</em>;
        if (leaf.underline) children = <u>{children}</u>;
        if (leaf.strikethrough) children = <s>{children}</s>;

        return <span {...attributes}>{children}</span>;
    }, []);

    // Custom renderElement to handle bullet/number lists
    const renderElement = useCallback((props) => {
        const { element, children, attributes } = props;

        switch (element.type) {
            case "bulleted-list":
                return <ul {...attributes}>{children}</ul>;
            case "numbered-list":
                return <ol {...attributes}>{children}</ol>;
            case "list-item":
                return <li {...attributes}>{children}</li>;
            default:
                return <p {...attributes}>{children}</p>;
        }
    }, []);

    return (
        <div className="p-3 py-2 border border-gray-300 rounded-md bg-[#F1F1F15C]">
            <Slate editor={editor} initialValue={[{ type: "paragraph", children: [{ text: "" }] }]} ref={editorRef}>
                <Editable
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    spellCheck
                    autoFocus
                    className="min-h-[100px!important] outline-none focus-visible:outline-none "
                    placeholder="Start typing..."
                    
                />
            </Slate>

            {/* Toolbar */}
            <div className="flex gap-2 mt-2 text-lg items-center text-black divide-x divide-gray-300">
                <div className="flex gap-2 pr-2">
                    <button
                        type="button"
                        onClick={() => toggleMark("bold")}
                        className="Acumin-Regular font-bold"
                    >
                        B
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleMark("italic")}
                        className="Acumin-Italic italic"
                    >
                        I
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleMark("strikethrough")}
                        className="Acumin-Italic line-through"
                    >
                        S
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleMark("underline")}
                        className="Acumin-Regular underline"
                    >
                        U
                    </button>
                </div>

                <div className="flex gap-2 pl-2">
                    <button
                        type="button"
                        onClick={() => toggleBlock("numbered-list")}
                        className="Acumin-Regular"
                    >
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path d="M7.26042 3.33333C7.26042 3.20073 7.31639 3.07355 7.41602 2.97978C7.51565 2.88601 7.65077 2.83333 7.79167 2.83333H14.875C15.0159 2.83333 15.151 2.88601 15.2507 2.97978C15.3503 3.07355 15.4062 3.20073 15.4062 3.33333C15.4062 3.46594 15.3503 3.59312 15.2507 3.68689C15.151 3.78066 15.0159 3.83333 14.875 3.83333H7.79167C7.65077 3.83333 7.51565 3.78066 7.41602 3.68689C7.31639 3.59312 7.26042 3.46594 7.26042 3.33333ZM7.79167 8.5H14.875C15.0159 8.5 15.151 8.44732 15.2507 8.35355C15.3503 8.25979 15.4062 8.13261 15.4062 8C15.4062 7.86739 15.3503 7.74022 15.2507 7.64645C15.151 7.55268 15.0159 7.5 14.875 7.5H7.79167C7.65077 7.5 7.51565 7.55268 7.41602 7.64645C7.31639 7.74022 7.26042 7.86739 7.26042 8C7.26042 8.13261 7.31639 8.25979 7.41602 8.35355C7.51565 8.44732 7.65077 8.5 7.79167 8.5ZM7.79167 13.1667H14.875C15.0159 13.1667 15.151 13.114 15.2507 13.0202C15.3503 12.9265 15.4062 12.7993 15.4062 12.6667C15.4062 12.5341 15.3503 12.4069 15.2507 12.3131C15.151 12.2193 15.0159 12.1667 14.875 12.1667H7.79167C7.65077 12.1667 7.51565 12.2193 7.41602 12.3131C7.31639 12.4069 7.26042 12.5341 7.26042 12.6667C7.26042 12.7993 7.31639 12.9265 7.41602 13.0202C7.51565 13.114 7.65077 13.1667 7.79167 13.1667ZM2.47917 5.5C2.33827 5.5 2.20314 5.55268 2.10352 5.64645C2.00389 5.74022 1.94792 5.86739 1.94792 6C1.94792 6.13261 2.00389 6.25979 2.10352 6.35355C2.20314 6.44732 2.33827 6.5 2.47917 6.5H4.60417C4.74506 6.5 4.88019 6.44732 4.97982 6.35355C5.07945 6.25979 5.13542 6.13261 5.13542 6C5.13542 5.86739 5.07945 5.74022 4.97982 5.64645C4.88019 5.55268 4.74506 5.5 4.60417 5.5H4.07292V2C4.07292 1.86739 4.01695 1.74021 3.91732 1.64645C3.81769 1.55268 3.68256 1.5 3.54167 1.5H2.47917C2.33827 1.5 2.20314 1.55268 2.10352 1.64645C2.00389 1.74021 1.94792 1.86739 1.94792 2C1.94792 2.13261 2.00389 2.25979 2.10352 2.35355C2.20314 2.44732 2.33827 2.5 2.47917 2.5H3.01042V5.5H2.47917ZM4.07292 12L1.80625 13.6C1.71705 13.663 1.65116 13.7507 1.61791 13.8509C1.58467 13.9511 1.58575 14.0586 1.62101 14.1581C1.65627 14.2577 1.72392 14.3443 1.81437 14.4056C1.90483 14.467 2.0135 14.5 2.125 14.5H4.95833C5.09923 14.5 5.23435 14.4473 5.33398 14.3536C5.43361 14.2598 5.48958 14.1326 5.48958 14C5.48958 13.8674 5.43361 13.7402 5.33398 13.6464C5.23435 13.5527 5.09923 13.5 4.95833 13.5H3.71875L4.71042 12.8C4.97604 12.6125 5.18634 12.3642 5.32133 12.0787C5.45632 11.7932 5.51153 11.4799 5.48171 11.1687C5.45189 10.8574 5.33804 10.5585 5.15096 10.3004C4.96388 10.0422 4.70978 9.83331 4.4128 9.69355C4.11582 9.55379 3.78581 9.48781 3.45411 9.50185C3.12241 9.5159 2.80003 9.60951 2.51759 9.77381C2.23514 9.9381 2.002 10.1676 1.84031 10.4406C1.67862 10.7135 1.59375 11.0208 1.59375 11.3333C1.59375 11.4659 1.64972 11.5931 1.74935 11.6869C1.84898 11.7807 1.9841 11.8333 2.125 11.8333C2.2659 11.8333 2.40102 11.7807 2.50065 11.6869C2.60028 11.5931 2.65625 11.4659 2.65625 11.3333C2.65625 11.1913 2.69483 11.0516 2.76832 10.9275C2.84182 10.8035 2.94779 10.6991 3.07618 10.6245C3.20456 10.5498 3.3511 10.5072 3.50187 10.5008C3.65264 10.4945 3.80265 10.5245 3.93764 10.588C4.07263 10.6515 4.18813 10.7465 4.27316 10.8638C4.3582 10.9812 4.40995 11.117 4.42351 11.2585C4.43706 11.4 4.41196 11.5424 4.35061 11.6721C4.28925 11.8019 4.19366 11.9148 4.07292 12Z" fill="black" />
                            </g>
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleBlock("bulleted-list")}
                        className="Acumin-Regular"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.92047 1.44043C1.12647 1.44043 0.480469 2.08643 0.480469 2.88043C0.480469 3.67443 1.12647 4.32043 1.92047 4.32043C2.71447 4.32043 3.36047 3.67443 3.36047 2.88043C3.36047 2.08643 2.71447 1.44043 1.92047 1.44043ZM1.92047 2.40043C2.18447 2.40043 2.40047 2.61643 2.40047 2.88043C2.40047 3.14443 2.18447 3.36043 1.92047 3.36043C1.65647 3.36043 1.44047 3.14443 1.44047 2.88043C1.44047 2.61643 1.65647 2.40043 1.92047 2.40043ZM1.92047 6.24043C1.12647 6.24043 0.480469 6.88643 0.480469 7.68043C0.480469 8.47443 1.12647 9.12043 1.92047 9.12043C2.71447 9.12043 3.36047 8.47443 3.36047 7.68043C3.36047 6.88643 2.71447 6.24043 1.92047 6.24043ZM1.92047 7.20043C2.18447 7.20043 2.40047 7.41643 2.40047 7.68043C2.40047 7.94443 2.18447 8.16043 1.92047 8.16043C1.65647 8.16043 1.44047 7.94443 1.44047 7.68043C1.44047 7.41643 1.65647 7.20043 1.92047 7.20043ZM1.92047 11.0404C1.12647 11.0404 0.480469 11.6864 0.480469 12.4804C0.480469 13.2744 1.12647 13.9204 1.92047 13.9204C2.71447 13.9204 3.36047 13.2744 3.36047 12.4804C3.36047 11.6864 2.71447 11.0404 1.92047 11.0404ZM1.92047 12.0004C2.18447 12.0004 2.40047 12.2164 2.40047 12.4804C2.40047 12.7444 2.18447 12.9604 1.92047 12.9604C1.65647 12.9604 1.44047 12.7444 1.44047 12.4804C1.44047 12.2164 1.65647 12.0004 1.92047 12.0004ZM4.80047 3.36043H14.4005C14.6645 3.36043 14.8805 3.14443 14.8805 2.88043C14.8805 2.61643 14.6645 2.40043 14.4005 2.40043H4.80047C4.53647 2.40043 4.32047 2.61643 4.32047 2.88043C4.32047 3.14443 4.53647 3.36043 4.80047 3.36043ZM4.80047 8.16043H14.4005C14.6645 8.16043 14.8805 7.94443 14.8805 7.68043C14.8805 7.41643 14.6645 7.20043 14.4005 7.20043H4.80047C4.53647 7.20043 4.32047 7.41643 4.32047 7.68043C4.32047 7.94443 4.53647 8.16043 4.80047 8.16043ZM4.80047 12.9604H14.4005C14.6645 12.9604 14.8805 12.7444 14.8805 12.4804C14.8805 12.2164 14.6645 12.0004 14.4005 12.0004H4.80047C4.53647 12.0004 4.32047 12.2164 4.32047 12.4804C4.32047 12.7444 4.53647 12.9604 4.80047 12.9604Z" fill="black" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
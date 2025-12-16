import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { resolvePath } from '../utils/imagePath';

interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:font-orbitron prose-headings:text-neon-cyan prose-a:text-neon-purple max-w-none">
            <ReactMarkdown
                components={{
                    code({ inline, className, children, ...props }: CodeComponentProps) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props as any}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    },
                    img(props) {
                        return <img {...props} src={resolvePath(props.src || '')} />
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;

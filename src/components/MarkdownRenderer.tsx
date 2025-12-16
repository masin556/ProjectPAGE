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

import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:font-orbitron prose-headings:text-neon-cyan prose-a:text-neon-purple max-w-none whitespace-pre-wrap">
            <ReactMarkdown
                remarkPlugins={[remarkBreaks, remarkMath]}
                rehypePlugins={[rehypeKatex]}
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
                    },
                    a(props) {
                        const { href, children } = props;
                        if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
                            // Extract video ID (simple logic)
                            let videoId = '';
                            if (href.includes('youtu.be')) {
                                videoId = href.split('/').pop()?.split('?')[0] || '';
                            } else if (href.includes('v=')) {
                                videoId = href.split('v=')[1]?.split('&')[0] || '';
                            }

                            if (videoId) {
                                return (
                                    <div className="my-4">
                                        {/* Show original link text if it's not the URL itself */}
                                        {children && children !== href && <div className="mb-2"><a href={href} target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">{children}</a></div>}
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            ></iframe>
                                        </div>
                                    </div>
                                );
                            }
                        }
                        return <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;

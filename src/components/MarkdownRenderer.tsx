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

import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:font-orbitron prose-headings:text-neon-cyan prose- headings:font-bold prose-h1:text-4xl prose-h1:mb-6 prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-strong:text-white prose-li:text-gray-300 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 max-w-none break-keep [&_strong]:text-neon-purple">
            <ReactMarkdown
                remarkPlugins={[remarkBreaks, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
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
                        return <img {...props} src={resolvePath(props.src || '')} className="rounded-lg shadow-lg my-6 max-h-[500px] object-cover" />
                    },
                    ul({ children }) {
                        return <ul className="list-disc pl-6 space-y-1 my-4 text-gray-300 marker:text-neon-cyan">{children}</ul>
                    },
                    ol({ children }) {
                        return <ol className="list-decimal pl-6 space-y-1 my-4 text-gray-300 marker:text-neon-cyan">{children}</ol>
                    },
                    li({ children }) {
                        return <li className="pl-1 leading-relaxed">{children}</li>
                    },
                    h1({ children }) {
                        return <h1 className="text-4xl font-bold font-orbitron text-neon-cyan mb-6 mt-2 border-b border-white/10 pb-4">{children}</h1>
                    },
                    h2({ children }) {
                        return <h2 className="text-2xl font-bold font-orbitron text-white mt-8 mb-4 flex items-center gap-2 before:content-['#'] before:text-neon-cyan">{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 className="text-xl font-bold font-orbitron text-gray-200 mt-6 mb-3">{children}</h3>
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className="border-l-4 border-neon-cyan bg-neon-cyan/5 px-4 py-2 my-4 rounded-r italic text-gray-300">
                                {children}
                            </blockquote>
                        )
                    },
                    table({ children }) {
                        return <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-white/10 border border-white/10">{children}</table></div>
                    },
                    th({ children }) {
                        return <th className="px-4 py-3 bg-white/5 text-left text-xs font-medium text-neon-cyan uppercase tracking-wider">{children}</th>
                    },
                    td({ children }) {
                        return <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 border-t border-white/10">{children}</td>
                    },
                    hr() {
                        return <hr className="border-white/10 my-8" />
                    },
                    a(props) {
                        const { href, children } = props;
                        if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
                            // YouTube Logic
                            let videoId = '';
                            if (href.includes('youtu.be')) {
                                videoId = href.split('/').pop()?.split('?')[0] || '';
                            } else if (href.includes('v=')) {
                                videoId = href.split('v=')[1]?.split('&')[0] || '';
                            }

                            if (videoId) {
                                return (
                                    <div className="my-6">
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            ></iframe>
                                        </div>
                                        {children && children !== href && <div className="mt-2 text-center text-xs text-gray-500">{children}</div>}
                                    </div>
                                );
                            }
                        }
                        return <a {...props} target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-neon-purple underline decoration-neon-cyan/30 underline-offset-4 transition-colors">{children}</a>
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;

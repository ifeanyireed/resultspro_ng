'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, User, ArrowLeft, MessageSquare, Heart } from 'lucide-react';

interface Comment {
  author: string;
  content: string;
  created_at: string;
}

interface Like {
  id: number;
  created_at: string;
  blog_post_id: number;
  user_id: string;
}

interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  comments: Comment[];
  likes: Like[];
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-16 font-body text-foreground">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-black text-xs uppercase tracking-widest mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 text-gray-500 text-[11px] font-black uppercase tracking-widest mb-8"
          >
            <div className="flex items-center gap-2" suppressHydrationWarning>
              <Clock className="w-4 h-4 text-primary" />
              {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {post.author}
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-premium text-4xl md:text-7xl mb-12 leading-[1.1] text-foreground"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-8 py-8 border-y border-white/5"
          >
            <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              {post.likes?.length || 0} Likes
            </div>
            <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest">
              <MessageSquare className="w-4 h-4 text-primary" />
              {post.comments?.length || 0} Comments
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none mb-20 text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section */}
        <section className="pt-20 border-t border-white/5">
          <h3 className="text-2xl font-black uppercase tracking-widest mb-12 text-foreground">Discussion</h3>
          <div className="space-y-8">
            {post.comments?.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="glass p-8 rounded-[2rem] border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-black text-xs uppercase tracking-widest">{comment.author}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-12 glass rounded-[2rem] border-white/5 uppercase font-bold text-xs tracking-widest">No comments yet. Start the conversation.</p>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  author: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-16 font-body text-foreground">
      <section className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border-primary/10 text-[11px] font-bold tracking-[0.2em] text-primary mb-6 uppercase"
          >
            Insights & Updates
          </motion.div>
          <h1 className="heading-premium text-5xl md:text-8xl mb-8">
            The <span className="text-primary">Scholars</span> Blog
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Exploring the future of education, technology, and gamification in West Africa.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <div className="col-span-full glass p-20 rounded-[3rem] text-center border-white/5">
                <p className="text-gray-500 font-black uppercase tracking-widest">Stay tuned. Fresh insights are on the way.</p>
              </div>
            ) : (
              posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5" suppressHydrationWarning>
                      <Clock className="w-3 h-3 text-primary" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3 h-3 text-primary" />
                      {post.author}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-display font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {/* Stripping HTML for the excerpt */}
                    {post.content.replace(/<[^>]*>?/gm, '')}
                  </p>

                  <Link href={`/blog/${post.slug}`} className="mt-auto flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/link">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.article>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}

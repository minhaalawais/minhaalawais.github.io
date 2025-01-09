import React, { useState } from 'react';
import Image from "next/image";
import { BiLinkExternal } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import BlogModal from './BlogModal';
import AllBlogsModal from './allBlogsModal';
import { Blog, blogs } from "@/types/main";

interface BlogsProps {
  blogsData: blogs;
}

const Blogs: React.FC<BlogsProps> = ({ blogsData }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isAllBlogsModalOpen, setIsAllBlogsModalOpen] = useState(false);

  const { title, blogs } = blogsData;

  return (
    <SectionWrapper id="blogs" className="min-h-screen mx-16 mb-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
          {title}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4 md:px-0">
        {blogs.slice(0, 3).map((blog) => (
          <article 
            key={blog.id} 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedBlog(blog)}
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <BsCalendarDate className="text-violet-600 dark:text-violet-400" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRegClock className="text-violet-600 dark:text-violet-400" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {blog.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {blog.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={() => setIsAllBlogsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full py-3 px-8 hover:shadow-lg hover:shadow-violet-600/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          View All Posts
          <BiLinkExternal className="text-lg" />
        </button>
      </div>

      {selectedBlog && (
        <BlogModal
          isOpen={!!selectedBlog}
          onClose={() => setSelectedBlog(null)}
          blog={selectedBlog}
        />
      )}

      <AllBlogsModal
        isOpen={isAllBlogsModalOpen}
        onClose={() => setIsAllBlogsModalOpen(false)}
        blogs={blogs}
      />
    </SectionWrapper>
  );
};

export default Blogs;


import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { BiLinkExternal } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import BlogModal from './BlogModal';

interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  date: string;
  readTime: string;
  blogUrl: string;
}

interface AllBlogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogs: Blog[];
}

const AllBlogsModal: React.FC<AllBlogsModalProps> = ({ isOpen, onClose, blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">All Blog Posts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article 
                key={blog.id} 
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <BsCalendarDate className="text-violet-600 dark:text-violet-400" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegClock className="text-violet-600 dark:text-violet-400" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {blog.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      {selectedBlog && (
        <BlogModal
          isOpen={!!selectedBlog}
          onClose={() => setSelectedBlog(null)}
          blog={selectedBlog}
        />
      )}
    </div>
  );
};

export default AllBlogsModal;


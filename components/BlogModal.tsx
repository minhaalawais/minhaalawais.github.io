import React from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { Blog } from "@/types/main";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{blog.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <IoMdClose size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {blog.date} · {blog.readTime}
          </p>
          <div className="relative w-full h-64 mb-6">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;


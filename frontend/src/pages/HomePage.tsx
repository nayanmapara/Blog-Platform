import React, { useEffect, useState } from 'react';
import {
  // Card,
  // CardHeader,
  // CardBody,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { apiService, Post, Category, Tag } from '../services/apiService';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt,desc");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
          apiService.getPosts({
            categoryId: selectedCategory,
            tagId: selectedTag
          }),
          apiService.getCategories(),
          apiService.getTags()
        ]);

        setPosts(postsResponse);
        setCategories(categoriesResponse);
        setTags(tagsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortBy, selectedCategory, selectedTag]);

  const handleCategoryChange = (categoryId: string | undefined) => {
    setSelectedCategory(categoryId === 'all' ? undefined : categoryId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-2xl rounded-3xl border border-violet-200 dark:border-violet-500 p-6 transition-all">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white drop-shadow-sm">
            ✨ Discover Posts
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 mt-2">
            Browse the latest content by category or tag.
          </p>
        </div>

        <Tabs
        selectedKey={selectedCategory}
        onSelectionChange={(key) => handleCategoryChange(key as string)}
        radius="full"
        variant="solid"
        classNames={{
          tabList: "gap-3 bg-white/30 dark:bg-white/10 p-2 rounded-full backdrop-blur-md",
          tab: "px-4 py-1.5 text-sm font-medium rounded-full hover:bg-white/50 dark:hover:bg-white/20",
          tabContent: "group-data-[selected=true]:text-white text-neutral-600 dark:text-white",
          cursor: "bg-gradient-to-r from-violet-500 to-indigo-500 shadow-md",
        }}
      >

          <Tab key="all" title="All" />
          {categories.map((cat) => (
            <Tab key={cat.id} title={`${cat.name} (${cat.postCount})`} />
          ))}
        </Tabs>

        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() =>
                setSelectedTag(tag.id === selectedTag ? undefined : tag.id)
              }
              className={`text-sm px-3 py-1 rounded-full border transition-all backdrop-blur-md
                ${
                  selectedTag === tag.id
                    ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md'
                    : 'bg-white/80 text-neutral-700 hover:bg-white border-violet-200 dark:bg-white/10 dark:text-white'
                }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>

      <PostList
        posts={posts}
        loading={loading}
        error={error}
        page={page}
        sortBy={sortBy}
        onPageChange={setPage}
        onSortChange={setSortBy}
      />
    </div>
  );
};

export default HomePage;

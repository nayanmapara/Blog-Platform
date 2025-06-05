import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService, Post } from '../services/apiService';
import PostList from '../components/PostList';

const DraftsPage: React.FC = () => {
  const [drafts, setDrafts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt,desc");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getDrafts({
          page: page - 1,
          size: 10,
          sort: sortBy,
        });
        setDrafts(response);
        setError(null);
      } catch (err) {
        setError('Failed to load drafts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [page, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <Card className="bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-2xl rounded-3xl border border-violet-200 dark:border-violet-500">
        <CardHeader className="flex justify-between items-center pb-2">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">📝 My Drafts</h1>
          <Button
            as={Link}
            to="/posts/new"
            color="primary"
            startContent={<Plus size={16} />}
            className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md hover:scale-[1.03] transition-transform"
          >
            New Post
          </Button>
        </CardHeader>

        <CardBody className="space-y-4">
          {error && (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <PostList
            posts={drafts}
            loading={loading}
            error={error}
            page={page}
            sortBy={sortBy}
            onPageChange={setPage}
            onSortChange={setSortBy}
          />

          {!loading && drafts?.length === 0 && (
            <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
              <p className="text-lg mb-4">You don't have any draft posts yet.</p>
              <Button
                as={Link}
                to="/posts/new"
                color="primary"
                variant="flat"
                className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow hover:scale-105 transition"
              >
                Create Your First Post
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default DraftsPage;

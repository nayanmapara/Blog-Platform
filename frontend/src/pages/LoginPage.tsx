import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { LogIn } from "lucide-react";
import { apiService } from "../services/apiService";
import { useAuth } from "../components/AuthContext"; 

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid credentials. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card
        className="w-full max-w-md bg-white/60 dark:bg-black/40 backdrop-blur-lg
                   shadow-[0_0_24px_4px_rgba(139,92,246,0.45)]
                   border border-violet-300 dark:border-violet-600 rounded-3xl"
      >
        <CardHeader className="justify-center py-6">
          <h1 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
            🔐 Welcome Back
          </h1>
        </CardHeader>

        <Divider />

        <CardBody as="form" onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 bg-red-100 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />

          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />

          <Button
            type="submit"
            color="primary"
            isLoading={isSubmitting}
            startContent={<LogIn size={16} />}
            className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md hover:scale-105 transition-transform"
          >
            Log In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;

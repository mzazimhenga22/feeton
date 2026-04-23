"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

type AuthView = "signin" | "signup" | "reset" | "reset-sent";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [view, setView] = useState<AuthView>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setShowPassword(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err, data } = await signIn(email, password);
    
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    // Check if user is admin to redirect
    if (data?.user && supabase) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .maybeSingle();
      
      if (profile?.is_admin) {
        window.location.href = "/admin";
        return;
      }
    }

    setLoading(false);
    resetForm();
    onClose();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await signUp(email, password, name);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      resetForm();
      onClose();
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await resetPassword(email);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setView("reset-sent");
    }
  };

  const switchView = (v: AuthView) => {
    setError("");
    setView(v);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-primary/10 rounded-[3.5rem] blur-3xl pointer-events-none" />

            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl overflow-hidden">
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
                    {view === "signin" && "Welcome Back"}
                    {view === "signup" && "Join The Collective"}
                    {view === "reset" && "Reset Access"}
                    {view === "reset-sent" && "Check Inbox"}
                  </div>
                  <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">
                    {view === "signin" && "Sign In"}
                    {view === "signup" && "Create Account"}
                    {view === "reset" && "Forgot Password"}
                    {view === "reset-sent" && "Email Sent"}
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  {/* Sign In */}
                  {view === "signin" && (
                    <motion.form
                      key="signin"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSignIn}
                      className="space-y-5"
                    >
                      <InputField
                        icon={<Mail className="w-4 h-4" />}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={setEmail}
                        required
                      />
                      <div className="relative">
                        <InputField
                          icon={<Lock className="w-4 h-4" />}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={setPassword}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {error && <ErrorMessage message={error} />}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.35em] glow-red flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                      </button>

                      <div className="text-center space-y-3 pt-2">
                        <button
                          type="button"
                          onClick={() => switchView("reset")}
                          className="text-[11px] uppercase tracking-[0.25em] text-white/30 hover:text-primary transition-colors"
                        >
                          Forgot Password?
                        </button>
                        <div className="h-px bg-white/5" />
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
                          No account?{" "}
                          <button
                            type="button"
                            onClick={() => switchView("signup")}
                            className="text-primary font-bold hover:underline"
                          >
                            Create One
                          </button>
                        </p>
                      </div>
                    </motion.form>
                  )}

                  {/* Sign Up */}
                  {view === "signup" && (
                    <motion.form
                      key="signup"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSignUp}
                      className="space-y-5"
                    >
                      <InputField
                        icon={<User className="w-4 h-4" />}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={setName}
                      />
                      <InputField
                        icon={<Mail className="w-4 h-4" />}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={setEmail}
                        required
                      />
                      <div className="relative">
                        <InputField
                          icon={<Lock className="w-4 h-4" />}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create Password"
                          value={password}
                          onChange={setPassword}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {error && <ErrorMessage message={error} />}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.35em] glow-red flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                      </button>

                      <div className="text-center pt-2">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
                          Already enrolled?{" "}
                          <button
                            type="button"
                            onClick={() => switchView("signin")}
                            className="text-primary font-bold hover:underline"
                          >
                            Sign In
                          </button>
                        </p>
                      </div>
                    </motion.form>
                  )}

                  {/* Reset Password */}
                  {view === "reset" && (
                    <motion.form
                      key="reset"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleReset}
                      className="space-y-5"
                    >
                      <p className="text-sm text-white/40 leading-relaxed">
                        Enter your email and we&apos;ll send you a link to reset your password.
                      </p>
                      <InputField
                        icon={<Mail className="w-4 h-4" />}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={setEmail}
                        required
                      />

                      {error && <ErrorMessage message={error} />}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.35em] glow-red flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => switchView("signin")}
                          className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold hover:underline"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* Reset Sent Confirmation */}
                  {view === "reset-sent" && (
                    <motion.div
                      key="reset-sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center space-y-6 py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
                      </motion.div>
                      <p className="text-sm text-white/50 leading-relaxed">
                        We&apos;ve sent a reset link to <span className="text-white font-bold">{email}</span>. Check your inbox.
                      </p>
                      <button
                        onClick={() => { resetForm(); switchView("signin"); }}
                        className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold hover:underline"
                      >
                        Return to Sign In
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Reusable Input ──────────────────────────────────────────── */
const InputField = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  minLength,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      minLength={minLength}
      className="w-full h-14 pl-12 pr-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-sm placeholder:text-white/25 placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[11px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
    />
  </div>
);

/* ── Error Message ───────────────────────────────────────────── */
const ErrorMessage = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs uppercase tracking-[0.15em]"
  >
    {message}
  </motion.div>
);

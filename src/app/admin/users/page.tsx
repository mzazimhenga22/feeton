"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Shield, 
  ShieldAlert, 
  User as UserIcon, 
  MoreVertical,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchProfiles = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data && !error) setProfiles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const toggleAdmin = async (id: string, currentStatus: boolean) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("profiles")
      .update({ is_admin: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Permission Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Synchronized",
        description: `User role updated to ${!currentStatus ? 'ADMIN' : 'MEMBER'}.`,
      });
      fetchProfiles();
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">Personnel Registry</h1>
          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Security Clearance & Protocol Authorization</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3">
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest text-white/30">Active Nodes</p>
            <p className="text-sm font-bold font-headline">{profiles.length}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest text-white/30">Privileged</p>
            <p className="text-sm font-bold font-headline text-primary">{profiles.filter(p => p.is_admin).length}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 rounded-[2.5rem] p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Identifier or Alias..." 
            className="h-14 pl-14 pr-6 bg-white/5 border-transparent focus:border-primary/50 rounded-full text-xs uppercase tracking-widest"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Subject</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Clearance</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Joined</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 text-right">Protocol</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredProfiles.map((profile, idx) => (
                <motion.tr 
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${profile.is_admin ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-white/20'}`}>
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1 truncate">{profile.full_name || 'Anonymous Subject'}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase">
                          <Mail className="w-3 h-3" /> {profile.email || 'No Email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {profile.is_admin ? (
                      <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[9px] font-bold flex items-center gap-2 w-fit">
                        <Shield className="w-3 h-3" /> LEVEL 01 ADMIN
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-white/30 border-white/10 uppercase tracking-widest text-[9px] font-bold flex items-center gap-2 w-fit">
                        MEMBER
                      </Badge>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      <Calendar className="w-3 h-3" />
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      onClick={() => toggleAdmin(profile.id, profile.is_admin)}
                      variant="ghost" 
                      className={`h-10 px-4 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${profile.is_admin ? 'hover:bg-red-500/10 hover:text-red-400' : 'hover:bg-primary/10 hover:text-primary'}`}
                    >
                      {profile.is_admin ? (
                        <><ShieldAlert className="w-3 h-3 mr-2" /> Revoke Clearance</>
                      ) : (
                        <><Shield className="w-3 h-3 mr-2" /> Grant clearance</>
                      )}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {!loading && filteredProfiles.length === 0 && (
          <div className="py-32 text-center space-y-4">
             <p className="text-[10px] uppercase tracking-widest text-white/20">No matching subjects found in the registry</p>
             <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[10px]" onClick={() => setSearch("")}>Reset Search</Button>
          </div>
        )}
      </div>
    </div>
  );
}

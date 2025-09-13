import React, { useState } from 'react';
import instance from '@/utils/api';
import { toast } from 'react-toastify';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';

interface UpdateuserProps {
  user: {
    id: string;
    name: string;
    email: string;
    password: string,
  };
  onSuccess: () => void;
  onClose: () => void;
}


const Updateuser: React.FC<UpdateuserProps> = ({ user, onSuccess, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await instance.put(`/user/update/${user.id}`, { name, email });
      toast.success(response.data?.message || "User updated successfully");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex flex-col gap-6 pb-5">
        <div className="grid gap-2">
          <Label className="block text-sm font-medium">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={updating}>
        {updating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default Updateuser;

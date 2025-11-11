import { useState } from "react";

export function useFormHandler<T extends Record<string, unknown>>(
  initialState: T,
  onSubmit: (data: T) => Promise<void>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setFormData(initialState);

  return { formData, handleChange, handleSubmit, resetForm, loading };
}

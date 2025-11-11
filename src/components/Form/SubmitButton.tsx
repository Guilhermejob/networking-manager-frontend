// src/components/Form/SubmitButton.tsx
import React from "react";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ label, loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-60"
  >
    {loading ? "Enviando..." : label}
  </button>
);

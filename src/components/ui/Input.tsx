import type React from "react"
import { cn } from "../../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id?: string
}

export const Input: React.FC<InputProps> = ({ id, label, error, className, ...props }) => {

  return (
    <div className="space-y-1">
      {label && id && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

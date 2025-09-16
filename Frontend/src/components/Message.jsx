import React from 'react'

const Message = ({ variant, children }) => {
      const getVariantClass = () => {
            switch (variant) {
                  case "success":
                        return "bg-green-900 text-green-200 border border-green-700";
                  case "danger":
                        return "bg-red-900 text-red-200 border border-red-700";
                  case "warning":
                        return "bg-yellow-900 text-yellow-200 border border-yellow-700";
                  case "info":
                  default:
                        return "bg-blue-900 text-blue-200 border border-blue-700";
            }
      };


      return (
            <div className={`p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${getVariantClass()}`}>
                  {/* Optional Icon per variant */}
                  {variant === "success" && <span>✅</span>}
                  {variant === "danger" && <span>❌</span>}
                  {variant === "warning" && <span>⚠️</span>}
                  {variant === "info" && <span>ℹ️</span>}

                  <span>{children}</span>
            </div>
      )
}

export default Message
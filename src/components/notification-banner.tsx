"use client"

import { useState, useEffect } from "react"
import { X, Info, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Import enhanced UI styles
import "@/styles/enhanced-ui.css"

interface NotificationBannerProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
  autoHideDuration?: number; // in milliseconds, if provided banner will auto-dismiss
  className?: string;
  icon?: boolean;
}

export function NotificationBanner({
  message,
  type = "info",
  dismissible = false,
  autoHideDuration,
  className,
  icon = true
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss functionality
  useEffect(() => {
    if (autoHideDuration && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isVisible]);

  if (!isVisible) return null;

  // Get color and icon based on type
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return "enhanced-notification border-blue-500 text-blue-800 dark:text-blue-200";
      case "warning":
        return "enhanced-notification border-yellow-500 text-yellow-800 dark:text-yellow-200";
      case "success":
        return "enhanced-notification border-green-500 text-green-800 dark:text-green-200";
      case "error":
        return "enhanced-notification border-red-500 text-red-800 dark:text-red-200";
      default:
        return "enhanced-notification border-blue-500 text-blue-800 dark:text-blue-200";
    }
  }
  
  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  }

  return (
    <div className={cn(getTypeStyles(), className)}>
      <div className="flex items-center justify-between p-4">
        {icon && getIcon()}
        <p className="ml-4 text-center flex-1">{message}</p>
        {dismissible && (
          <Button 
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

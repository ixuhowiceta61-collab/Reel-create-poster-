import React from 'react';
import { LanguageSelector } from './LanguageSelector';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
}) => {
  return <LanguageSelector className={className} />;
};


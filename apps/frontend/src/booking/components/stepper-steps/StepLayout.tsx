import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface StepLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  alignButtons?: 'space-between' | 'end' | 'center';
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  description,
  children,
  showBack = true,
  showNext = true,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextDisabled = false,
  onBack,
  onNext,
  alignButtons = 'space-between',
}) => {
  return (
    <Box>
      {title && <Typography variant="h5">{title}</Typography>}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>{children}</Box>

      {(showBack || showNext) && (
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: alignButtons,
            gap: 2,
          }}
        >
          {showBack && <Button onClick={onBack}>{backLabel}</Button>}
          {showNext && (
            <Button
              variant="contained"
              disabled={nextDisabled}
              onClick={onNext}
            >
              {nextLabel}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StepLayout;

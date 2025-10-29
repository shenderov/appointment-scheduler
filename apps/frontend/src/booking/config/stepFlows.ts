import StepService from '@booking/components/stepper-steps/StepService';
import StepCalendar from '@booking/components/stepper-steps/StepCalendar';
import StepReview from '@booking/components/stepper-steps/StepReview';
import StepConfirmation from '@booking/components/stepper-steps/StepConfirmation';
import StepUser from '@booking/components/stepper-steps/StepUser';
import { Role } from '@shared-models/enums/auth/role.enum';

export const stepFlows = {
  [Role.CLIENT]: [
    { key: 'service', label: 'Service', component: StepService },
    { key: 'calendar', label: 'Calendar', component: StepCalendar },
    { key: 'review', label: 'Review', component: StepReview },
    { key: 'confirmation', label: 'Confirmation', component: StepConfirmation },
  ],
  [Role.PROVIDER]: [
    { key: 'client', label: 'Client', component: StepUser },
    { key: 'service', label: 'Service', component: StepService },
    { key: 'calendar', label: 'Calendar', component: StepCalendar },
    { key: 'review', label: 'Review', component: StepReview },
    {
      key: 'confirmation',
      label: 'Confirmation',
      component: StepConfirmation,
    },
  ],
  [Role.ADMIN]: [
    { key: 'client', label: 'Client', component: StepUser },
    { key: 'service', label: 'Service', component: StepService },
    { key: 'calendar', label: 'Calendar', component: StepCalendar },
    { key: 'review', label: 'Review', component: StepReview },
    {
      key: 'confirmation',
      label: 'Confirmation',
      component: StepConfirmation,
    },
  ],
} as const;

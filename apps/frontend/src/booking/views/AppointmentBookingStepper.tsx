import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useAppointmentStepper } from '@booking/hooks/useAppointmentStepper';
import { stepFlows } from '@booking/config/stepFlows';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';
import type { StepFlow } from '@booking/types/stepper';

const AppointmentBookingStepper = () => {
  const stepper = useAppointmentStepper();
  const { user } = useAuth();
  const role = (Object.values(Role) as Role[]).includes(user.role)
    ? user.role
    : Role.CLIENT;
  const stepsForRole: StepFlow[] =
    (stepFlows as unknown as Record<Role, StepFlow[]>)[role] ||
    stepFlows[Role.CLIENT];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Stepper activeStep={stepper.activeStep} alternativeLabel>
        {stepsForRole.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {stepsForRole.map(({ key, component: StepComponent }, index) =>
          stepper.activeStep === index ? (
            <StepComponent key={key} {...stepper} />
          ) : null,
        )}
      </Box>
    </Box>
  );
};

export default AppointmentBookingStepper;

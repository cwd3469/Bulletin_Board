import { ProcessType } from '../type';
import SigninDisable from './SigninDisable';
import SigninDormant from './SigninDormant';
import SigninExcessChangePw from './SigninExcessChangePw';
import SigninFirstChangePw from './SigninFirstChangePw';
import SigninNotApproved from './SigninNotApproved';

const SigninProcess = (props: ProcessType) => {
  const { label, open, handleClose } = props;

  switch (label) {
    case 'disable':
      return <SigninDisable open={open} handleClose={handleClose} />;
    case 'dormant':
      return <SigninDormant open={open} handleClose={handleClose} />;
    case 'not-approved':
      return <SigninNotApproved open={open} handleClose={handleClose} />;
    case 'first':
      return <SigninFirstChangePw open={open} handleClose={handleClose} />;
    case 'excess':
      return <SigninExcessChangePw open={open} handleClose={handleClose} />;
    default:
      return <></>;
  }
};

export default SigninProcess;

import { Typography } from '@mui/material';

function PageHeader() {
  const user =
  {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Accounts Settings
      </Typography>
      <Typography variant="subtitle2">
        Hello {user.name},{' '}
        this is your sccount settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;

import { Stack } from '@mui/material';
import { AppView } from '@/components';
import MessageBoard from '@/components/chat/MessageBoard';

const MainView = () => {

  return (
    <AppView>
      <Stack direction="row" justifyContent="center" flex={1} width="100%" height="100%">
        <MessageBoard/>
      </Stack>
    </AppView>
  );
};

export default MainView;

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import {MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import {ModalsProvider} from '@mantine/modals';
import {Router} from './Router';
import {theme} from './theme';
import './fonts.css';

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <Notifications position="top-right" />
                <Router/>
            </ModalsProvider>
        </MantineProvider>
    );
}

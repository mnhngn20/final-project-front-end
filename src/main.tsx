import 'antd/dist/antd.css';
import '#/configs/theme/index.less';
import '#/shared/utils/style.css';
import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import './configs';
import { ApolloProvider } from '@apollo/client';
import { formConfig } from './configs/config';
import App from './routers/App';
import i18n from './shared/i18n';
import { client } from './graphql/client';
import { getPopupContainer } from './shared/utils/tool';

createRoot(document.getElementById('root')!).render(
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <ConfigProvider
          getPopupContainer={getPopupContainer}
          form={formConfig}
          componentSize="large"
          locale={enUS}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </ApolloProvider>
    </I18nextProvider>
  </Sentry.ErrorBoundary>,
);

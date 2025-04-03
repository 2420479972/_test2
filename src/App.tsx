// import { useEffect } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { selectLanguage, Language } from "./lib/features/locale/localeSlice";
// import { refreshContracts } from "./lib/features/contract/contractSlice";
import {
  // useAppDispatch,
  useAppSelector,
} from "./lib/hooks";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorModal from "./components/ErrorModal";
import PullToRefresh from "react-simple-pull-to-refresh";

import enMessages from "./locales/en.json";
import cnMessages from "./locales/cn.json";

import Header from "./components/Header";
import FloatingBubble from "./components/FloatingBubble";
import ErrorResult from "./components/ErrorResult";
import Page from "./page";

const messages: Record<Language, typeof enMessages> = {
  en: enMessages,
  "zh-CN": cnMessages,
};

function App() {
  // const dispatch = useAppDispatch();
  const locale = useAppSelector(selectLanguage);
  const { isConnected } = useAccount();

  // useEffect(() => {
  //   dispatch(refreshContracts());
  // }, [dispatch]);

  const onRefresh = async () => {
    await location.reload();
  };

  return (
    <RainbowKitProvider locale={locale} theme={darkTheme()}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <PullToRefresh
          onRefresh={onRefresh}
          pullingContent=""
          // icon={
          //   <div className="flex items-center justify-center">
          //     <svg
          //       className="genericon"
          //       viewBox="0 0 1000 1000"
          //       xmlns="http://www.w3.org/2000/svg"
          //       p-id="6615"
          //     >
          //       <path
          //         d="M227.986 584.688l257.492 257.492c20.11 20.11 52.709 20.11 72.819 0l257.492-257.492c20.11-20.11 20.11-52.709 0-72.819s-52.709-20.11-72.819 0l-169.585 169.585v-493.664c0-28.453-23.046-51.499-51.499-51.499s-51.499 23.046-51.499 51.499v493.664l-169.585-169.585c-10.042-10.043-23.226-15.089-36.41-15.089s-26.367 5.021-36.41 15.089c-20.11 20.11-20.11 52.709 0 72.819z"
          //         fill="#ffffff"
          //       />
          //     </svg>
          //   </div>
          // }
        >
          <ErrorProvider>
            <FloatingBubble />

            <Header />

            {isConnected ? (
              <Page />
            ) : (
              <ErrorResult>
                <FormattedMessage id="请先连接钱包" />
              </ErrorResult>
            )}

            <ErrorModal />
          </ErrorProvider>
        </PullToRefresh>
      </IntlProvider>
    </RainbowKitProvider>
  );
}

export default App;

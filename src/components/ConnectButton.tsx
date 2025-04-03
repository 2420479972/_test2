import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FormattedMessage } from "react-intl";

import wallet from "/wallet.png";

export default function MyConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-[#0DD585]/20 px-[0.375em] py-[0.5em] flex items-center justify-center gap-[0.25em] rounded-[0.125em]"
                  >
                    <img src={wallet} alt="" className="w-[0.5em] h-[0.5em]" />

                    <p className="text-[0.75em]">
                      <FormattedMessage id="连接钱包" />
                    </p>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-[#FF494A]/20 px-[0.375em] py-[0.5em] flex items-center justify-center gap-[0.25em] rounded-[0.125em]"
                  >
                    <p className="text-[0.75em]">
                      <FormattedMessage id="错误的网络" />
                    </p>
                  </button>
                );
              }
              return (
                <button onClick={openAccountModal} type="button">
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

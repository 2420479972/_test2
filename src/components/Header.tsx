import { useState } from "react";
import { useAccount } from "wagmi";
import { FormattedMessage } from "react-intl";
import ConnectButton from "./ConnectButton";
import {
  selectLanguage,
  setLanguage,
  Language,
} from "../lib/features/locale/localeSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { selectInfo } from "../lib/features/info/infoSlice";
import Modal from "../components/Modal";
import { useError } from "../hooks/useError";

import node from "/node.png";
import ch from "/ch.png";
import en from "/en.png";
import link from "/link.png";
import bg_invite from "/bg-invite.png";
import icon_link from "/icon-link.png";
import icon_parent from "/icon-parent.png";
import icon_copy from "/icon-copy.png";
import icon_succeed from "/icon-succeed.png";

export default function Header() {
  const { isConnected, address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [copyParentSuccess, setCopyParentSuccess] = useState(false);
  const { showError } = useError();

  const dispatch = useAppDispatch();
  const locale = useAppSelector(selectLanguage);
  const info = useAppSelector(selectInfo);
  const { account_info } = info || {};
  const { parent } = account_info || {};
  const inviteLink = `${window.location.origin}?invitation=${address}`;

  const changeLocale = (locale: Language) => () => {
    dispatch(setLanguage(locale));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard =
    (text: string, type: "link" | "parent") => async () => {
      try {
        await navigator.clipboard.writeText(text);

        if (type === "link") {
          setCopyLinkSuccess(true);
          setTimeout(() => setCopyLinkSuccess(false), 2000);
        } else {
          setCopyParentSuccess(true);
          setTimeout(() => setCopyParentSuccess(false), 2000);
        }
      } catch (err) {
        showError(`Failed to copy text: ${err}`);
      }
    };

  return (
    <header>
      {/* <p className="h-[3em] flex items-center justify-center">A U C</p> */}

      <div className="h-[3em] px-[0.75em] flex items-center justify-between gap-[1em]">
        <div className="flex items-center justify-center gap-[0.25em]">
          <img src={node} alt="" className="w-[1.25em] h-[1.25em]" />

          <ConnectButton />
        </div>

        <div className="flex items-center justify-center gap-[0.5em]">
          <div className="w-[1.25em] h-[1.25em] [&_img]:w-full [&_img]:h-full">
            {locale === "en" ? (
              <img src={en} alt="" onClick={changeLocale("zh-CN")} />
            ) : (
              <img src={ch} alt="" onClick={changeLocale("en")} />
            )}
          </div>

          {isConnected && (
            <img
              src={link}
              alt=""
              className="w-[1.25em] h-[1.25em]"
              onClick={openModal}
            />
          )}

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="max-h-[80vh] overflow-auto">
              <img src={bg_invite} alt="" className="w-full h-auto" />

              <div className="px-[1em] py-[1.5em]">
                <div className="flex items-center gap-[0.5em]">
                  <img
                    src={icon_parent}
                    alt=""
                    className="w-[1.25em] h-[1.25em]"
                  />

                  <p className="text-[#1691FF] leading-normal font-medium">
                    <FormattedMessage id="上级地址" />
                  </p>
                </div>

                <div className="flex items-center gap-[0.5em] mt-[0.5em]">
                  <p className="leading-normal">
                    {parent?.replace(/^(.{6}).*(.{6})$/, "$1****$2")}
                  </p>

                  {copyParentSuccess ? (
                    <div className="flex items-center gap-[0.25em]">
                      <img
                        src={icon_succeed}
                        alt=""
                        className="w-[1.25em] h-[1.25em]"
                      />

                      <p className="text-[0.875em] leading-normal">
                        <FormattedMessage id="已复制" />
                      </p>
                    </div>
                  ) : (
                    <img
                      src={icon_copy}
                      alt=""
                      className="w-[1.25em] h-[1.25em]"
                      onClick={copyToClipboard(parent || "", "parent")}
                    />
                  )}
                </div>

                <div className="flex items-center gap-[0.5em] mt-[0.75em]">
                  <img
                    src={icon_link}
                    alt=""
                    className="w-[1.25em] h-[1.25em]"
                  />

                  <p className="text-[#1691FF] leading-normal font-medium">
                    <FormattedMessage id="邀请链接" />
                  </p>
                </div>

                <div className="flex items-center gap-[0.5em] mt-[0.5em]">
                  <p className="leading-normal">
                    {address?.replace(/^(.{6}).*(.{6})$/, "$1****$2")}
                  </p>
                  {copyLinkSuccess ? (
                    <div className="flex items-center gap-[0.25em]">
                      <img
                        src={icon_succeed}
                        alt=""
                        className="w-[1.25em] h-[1.25em]"
                      />

                      <p className="text-[0.875em] leading-normal">
                        <FormattedMessage id="已复制" />
                      </p>
                    </div>
                  ) : (
                    <img
                      src={icon_copy}
                      alt=""
                      className="w-[1.25em] h-[1.25em] ml-0.5em"
                      onClick={copyToClipboard(inviteLink, "link")}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { Logo, Modal } from "./shared/components";
import CreateGreenCoinForm from "./CreateGreenCoinForm";
import { Link } from "react-router-dom";

interface HeaderProps {
  showCreate?: boolean;
}

export default ({ showCreate = true }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="site-header flex flex-col fixed top-0 left-0 w-full z-40 p-4">
        <div className="flex justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div>
            <ConnectKitButton />
          </div>
        </div>
        {showCreate && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="button-shadow px-4 py-2 text-2xl rounded-md bg-secondary text-secondary-content"
            >
              [create a green coin]
            </button>
          </div>
        )}
      </header>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          closeOnOutsideClick={false}
        >
          <div className="w-[calc(100vw-32px)] md:w-[80vw] lg:w-[800px] h-[calc(100svh-96px)] md:h-[536px] p-2">
            <CreateGreenCoinForm />
          </div>
        </Modal>
      )}
    </>
  );
};

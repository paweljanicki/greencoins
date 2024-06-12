import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import Logo from "./Logo";
import Modal from "./Modal";
import CreateGreenCoinForm from "./CreateGreenCoinForm";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="site-header flex flex-col fixed top-0 left-0 w-full z-40 p-4">
        <div className="flex justify-between">
          <div className="">
            <Logo />
          </div>
          <div>
            <ConnectKitButton />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="button-shadow px-4 py-2 text-2xl rounded-md bg-secondary text-secondary-content"
          >
            [create a green coin]
          </button>
        </div>
      </header>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          closeOnOutsideClick={false}
        >
          <div className="w-[800px] h-[500px]">
            <CreateGreenCoinForm />
          </div>
        </Modal>
      )}
    </>
  );
};

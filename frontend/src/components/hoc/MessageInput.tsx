import React, { useRef, useState } from "react";
import { Button } from "../common/buttons";

interface MessageInputProps {
  text: string;
  file: File | undefined;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChangeFile: (file: File) => void;
  onSend: () => void;
  isDisabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  onChangeText,
  onChangeFile,
  onSend,
  isDisabled,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleSend = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  return (
    <>
      {showDialog && <Dialog text={text} onTextChange={onChangeText} setDialog={setShowDialog} onSend={onSend} setFile={onChangeFile} />}
      <form onSubmit={handleSend}>
        <div className="flex gap-4 items-center p-2">
          <input
            className="outline-none text-sm p-3 w-full border border-gray-100 rounded-full"
            placeholder="Type your message here"
            value={text}
            onChange={onChangeText}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <Button type="button" onClick={() => setShowDialog(true)} variant="primary">
            Attach
          </Button>
          <Button type="submit" disabled={isDisabled} variant="primary">
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;

const Dialog: React.FC<{
  setDialog: (state: boolean) => void;
  setFile: (file: any) => void;
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}> = ({ setDialog, setFile, onSend, onTextChange, text }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(undefined);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    onSend();
    setDialog(false);
  };

  return (
    <div className="absolute bg-[#00000010] flex p-4 justify-center items-end z-[99] top-0 left-0 h-screen w-full">
      <div className="bg-gray-50 flex justify-center p-6 rounded-lg shadow-md w-full h-fit">
        <div>
          {imagePreview ? (
            <img
              className="w-[500px] h-[500px] mt-4"
              src={imagePreview}
              alt="Preview"
            />
          ) : (
            <>
              <div
                onClick={handleButtonClick}
                className="w-[500px] h-[500px] mt-4 border rounded-lg text-gray-400 flex justify-center items-center cursor-pointer"
              >
                Click here to upload File
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                accept=".jpg, .jpeg, .gif, .png"
              />
            </>
          )}
          <input
            className="my-2 outline-none text-sm p-3 w-full border border-gray-100 rounded-full"
            placeholder="Type your message here"
            value={text}
            onChange={onTextChange}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <div className="my-2 flex justify-between">
            <Button variant="secondary" onClick={() => setDialog(false)}>
              Discard
            </Button>
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

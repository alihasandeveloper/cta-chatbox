import {IoIosSend} from "react-icons/io";
import { CiImageOn } from "react-icons/ci";


const ChatboxForm = ({input, setInput, handleSubmit , handelImage , preview, image , fileInputRef}) => {

    return (
        <div className="flex p-4 border-t border-gray-200">
            <form
                className="w-full h-full"
                onSubmit={handleSubmit}
            >
                <div className='mb-2'>
                    <label className="block  text-sm font-medium text-gray-900 flex items-center gap-1"
                           htmlFor="file_input">Upload file <CiImageOn size={20}/></label>
                    <input
                        className="focus:outline-none"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        onChange={handelImage}
                        ref={fileInputRef}
                    />
                </div>
                <div className='flex w-full gap-2 h-full max-h-[50px]'>
                    <input
                        className="border border-black w-3/4 p-2 rounded resize-none"
                        placeholder="Type your message..."
                        required
                        value={input}
                        onChange={(e) => setInput(e.target.value)}

                    />
                    <button
                        type="submit"
                        className="w-1/4 cursor-pointer bg-black text-white rounded flex items-center justify-center"
                    >
                        <IoIosSend size={20}/>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ChatboxForm;
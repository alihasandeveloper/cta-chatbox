import {IoIosSend} from "react-icons/io";
import { IoMdImage } from "react-icons/io";
import {BsFillMicFill} from "react-icons/bs";


const ChatboxForm = ({input, setInput, handleSubmit, handleImage, image, fileInputRef}) => {
    return (
        <div className="flex p-4 border-t border-gray-200 flex-col ">
            {image && (
                <div>
                    <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="w-12 h-12 mb-2 rounded "
                    />
                </div>
            )}

            <form className="w-full flex items-center gap-2 " onSubmit={handleSubmit}>
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-black hover:text-gray-600  duration-200 ease transition-all"
                >
                    <IoMdImage size={24}/>
                </button>

                <button
                    type="button"
                    // onClick={() => fileInputRef.current.click()}
                    className="text-black hover:text-gray-600  duration-200 ease transition-all"
                >
                    <BsFillMicFill size={20}/>
                </button>

                <input
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    ref={fileInputRef}
                    className="hidden"
                />

                <input
                    className="flex-grow p-3 rounded-full placeholder-gray-600 border border-gray-300 focus:border-gray-700 focus:outline-none transition-all duration-200 ease-in-out"
                    placeholder="Send Message"
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    type="submit"
                    className="text-white bg-black hover:bg-gray-600 p-3 rounded-full flex items-center justify-center hidden"
                >
                    <IoIosSend size={20}/>
                </button>
            </form>
        </div>
    );
};

export default ChatboxForm;

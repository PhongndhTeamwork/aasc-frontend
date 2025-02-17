import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {X} from "lucide-react";
import {MessagePayloadForm} from "@/lib/types/toast.type";

type Props = {
    triggerMessage: boolean;
    message: MessagePayloadForm
}


const ToastInitialisation = ({ triggerMessage, message } : Props) => {
    useEffect(() => {
        if (message.content === "") return;

        toast.error((t) => (
            <div className="flex items-center">
                {message?.content}
                <div
                    className="rounded-md bg-gray-50 ml-2 p-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toast.dismiss(t.id)}
                >
                    <X />
                </div>
            </div>
        ), {
            style: {
                border: message.type === "error" ? "1px solid red" : "1px solid green",
                padding: "16px",
                color: message.type === "error" ? "red" : "green",
            },
            iconTheme: {
                primary: message.type === "error" ? "red" : "green",
                secondary: "#FFFAEE",
            },
            duration: 5000,
        });
    }, [triggerMessage, message]);

    return null; // This component doesn't render anything visible directly
};

export default ToastInitialisation;
